import { P5Component } from '../core/P5Component.js';

/**
 * P5TextBox - VB6-style text input component
 * Supports text input, selection, cursor, and various text manipulation features
 */
export class P5TextBox extends P5Component {
  constructor(options = {}) {
    super({
      width: 200,
      height: 30,
      text: '',
      backColor: '#FFFFFF',
      foreColor: '#000000',
      borderColor: '#999999',
      borderWidth: 1,
      fontSize: 14,
      ...options
    });

    // TextBox-specific properties
    this._placeholder = options.placeholder || '';
    this._placeholderColor = options.placeholderColor || '#AAAAAA';
    this._maxLength = options.maxLength || 255;
    this._readOnly = options.readOnly || false;
    this._passwordChar = options.passwordChar || null; // Set to '*' for password fields
    this._multiline = options.multiline || false;
    this._textAlign = options.textAlign || 'left'; // left, center, right

    // Cursor and selection
    this._cursorPosition = this._text.length;
    this._cursorVisible = true;
    this._cursorBlinkInterval = null;
    this._selectionStart = -1;
    this._selectionEnd = -1;

    // Focus color
    this._focusBorderColor = options.focusBorderColor || '#4A90E2';

    // Padding
    this._padding = options.padding !== undefined ? options.padding : 5;
  }

  // ==================== Additional Properties ====================

  get placeholder() { return this._placeholder; }
  set placeholder(value) {
    this._placeholder = value;
    this.redraw();
  }

  get maxLength() { return this._maxLength; }
  set maxLength(value) { this._maxLength = value; }

  get readOnly() { return this._readOnly; }
  set readOnly(value) {
    this._readOnly = value;
    this.redraw();
  }

  get passwordChar() { return this._passwordChar; }
  set passwordChar(value) {
    this._passwordChar = value;
    this.redraw();
  }

  get multiline() { return this._multiline; }
  set multiline(value) { this._multiline = value; }

  get textAlign() { return this._textAlign; }
  set textAlign(value) {
    this._textAlign = value;
    this.redraw();
  }

  // ==================== Rendering ====================

  setup(p) {
    p.noLoop(); // Only redraw when needed
    p.textFont(this._fontFamily);
    p.textSize(this._fontSize);

    // Start cursor blinking when focused
    this.on('focus', () => this._startCursorBlink());
    this.on('blur', () => this._stopCursorBlink());
  }

  draw(p) {
    p.clear();

    // Draw background
    p.fill(this._enabled ? this._backColor : '#F5F5F5');
    p.stroke(this._state === 'focused' ? this._focusBorderColor : this._borderColor);
    p.strokeWeight(this._state === 'focused' ? 2 : this._borderWidth);
    p.rect(0, 0, this._width, this._height);

    // Set text properties
    p.textFont(this._fontFamily);
    p.textSize(this._fontSize);

    // Determine text alignment
    let textX = this._padding;
    let textAlignMode = p.LEFT;

    switch (this._textAlign) {
      case 'center':
        textX = this._width / 2;
        textAlignMode = p.CENTER;
        break;
      case 'right':
        textX = this._width - this._padding;
        textAlignMode = p.RIGHT;
        break;
    }

    p.textAlign(textAlignMode, p.CENTER);

    // Display text or placeholder
    let displayText = this._text;

    if (this._text.length === 0 && this._placeholder && this._state !== 'focused') {
      // Show placeholder
      p.fill(this._placeholderColor);
      p.noStroke();
      p.text(this._placeholder, textX, this._height / 2);
    } else {
      // Show actual text
      if (this._passwordChar) {
        displayText = this._passwordChar.repeat(this._text.length);
      }

      // Draw selection background if any
      if (this._state === 'focused' && this._selectionStart >= 0 && this._selectionEnd >= 0) {
        this._drawSelection(p, displayText);
      }

      // Draw text
      p.fill(this._enabled ? this._foreColor : '#AAAAAA');
      p.noStroke();

      // Truncate text if it exceeds width
      const maxTextWidth = this._width - (this._padding * 2);
      let truncatedText = displayText;

      while (p.textWidth(truncatedText) > maxTextWidth && truncatedText.length > 0) {
        truncatedText = truncatedText.substring(1);
      }

      p.text(truncatedText, textX, this._height / 2);

      // Draw cursor if focused
      if (this._state === 'focused' && this._cursorVisible && !this._readOnly) {
        this._drawCursor(p, truncatedText, textX);
      }
    }
  }

  _drawCursor(p, displayText, textX) {
    // Calculate cursor X position
    let cursorX;

    if (this._textAlign === 'left') {
      const textBeforeCursor = displayText.substring(0, this._cursorPosition);
      cursorX = textX + p.textWidth(textBeforeCursor);
    } else if (this._textAlign === 'center') {
      const textBeforeCursor = displayText.substring(0, this._cursorPosition);
      const fullTextWidth = p.textWidth(displayText);
      cursorX = textX - (fullTextWidth / 2) + p.textWidth(textBeforeCursor);
    } else {
      const textAfterCursor = displayText.substring(this._cursorPosition);
      cursorX = textX - p.textWidth(textAfterCursor);
    }

    // Draw cursor line
    p.stroke(this._foreColor);
    p.strokeWeight(1);
    const cursorHeight = this._fontSize;
    const cursorY = (this._height - cursorHeight) / 2;
    p.line(cursorX, cursorY, cursorX, cursorY + cursorHeight);
  }

  _drawSelection(p, displayText) {
    // Draw selection background (simplified version)
    const selStart = Math.min(this._selectionStart, this._selectionEnd);
    const selEnd = Math.max(this._selectionStart, this._selectionEnd);

    const textBeforeSelection = displayText.substring(0, selStart);
    const selectedText = displayText.substring(selStart, selEnd);

    const selectionX = this._padding + p.textWidth(textBeforeSelection);
    const selectionWidth = p.textWidth(selectedText);

    p.fill(100, 150, 255, 100);
    p.noStroke();
    p.rect(selectionX, 0, selectionWidth, this._height);
  }

  _startCursorBlink() {
    this._cursorVisible = true;
    this._cursorBlinkInterval = setInterval(() => {
      this._cursorVisible = !this._cursorVisible;
      this.redraw();
    }, 500);
  }

  _stopCursorBlink() {
    if (this._cursorBlinkInterval) {
      clearInterval(this._cursorBlinkInterval);
      this._cursorBlinkInterval = null;
    }
    this._cursorVisible = true;
    this.redraw();
  }

  // ==================== Keyboard Handling ====================

  handleKeyPressed(p) {
    if (this._readOnly) return;

    const key = p.key;
    const keyCode = p.keyCode;

    // Handle special keys
    if (keyCode === p.BACKSPACE) {
      if (this._text.length > 0 && this._cursorPosition > 0) {
        this._text = this._text.substring(0, this._cursorPosition - 1) +
                     this._text.substring(this._cursorPosition);
        this._cursorPosition--;
        this.emit('change', this._text);
        this.emit('keyPress', { key: 'Backspace', keyCode });
        this.redraw();
      }
      return false; // Prevent default
    }

    if (keyCode === p.DELETE) {
      if (this._cursorPosition < this._text.length) {
        this._text = this._text.substring(0, this._cursorPosition) +
                     this._text.substring(this._cursorPosition + 1);
        this.emit('change', this._text);
        this.emit('keyPress', { key: 'Delete', keyCode });
        this.redraw();
      }
      return false;
    }

    if (keyCode === p.LEFT_ARROW) {
      if (this._cursorPosition > 0) {
        this._cursorPosition--;
        this.redraw();
      }
      return false;
    }

    if (keyCode === p.RIGHT_ARROW) {
      if (this._cursorPosition < this._text.length) {
        this._cursorPosition++;
        this.redraw();
      }
      return false;
    }

    if (keyCode === p.HOME) {
      this._cursorPosition = 0;
      this.redraw();
      return false;
    }

    if (keyCode === p.END) {
      this._cursorPosition = this._text.length;
      this.redraw();
      return false;
    }

    if (keyCode === p.ENTER && !this._multiline) {
      this.emit('submit', this._text);
      this.blur();
      return false;
    }
  }

  handleKeyTyped(p) {
    if (this._readOnly) return;

    const key = p.key;

    // Filter out control characters
    if (key.length === 1 && key.charCodeAt(0) >= 32) {
      if (this._text.length < this._maxLength) {
        this._text = this._text.substring(0, this._cursorPosition) +
                     key +
                     this._text.substring(this._cursorPosition);
        this._cursorPosition++;
        this.emit('change', this._text);
        this.emit('keyPress', { key, keyCode: key.charCodeAt(0) });
        this.redraw();
      }
    }
  }

  // ==================== VB6-like Methods ====================

  /**
   * Clear all text
   */
  clear() {
    this._text = '';
    this._cursorPosition = 0;
    this.emit('change', this._text);
    this.redraw();
  }

  /**
   * Select all text
   */
  selectAll() {
    this._selectionStart = 0;
    this._selectionEnd = this._text.length;
    this.redraw();
  }

  /**
   * Get selected text
   * @returns {string} Selected text
   */
  getSelectedText() {
    if (this._selectionStart >= 0 && this._selectionEnd >= 0) {
      const start = Math.min(this._selectionStart, this._selectionEnd);
      const end = Math.max(this._selectionStart, this._selectionEnd);
      return this._text.substring(start, end);
    }
    return '';
  }

  // ==================== Event Overrides ====================

  _handleMousePressed() {
    super._handleMousePressed();

    if (this._enabled && !this._readOnly) {
      this.focus();

      // Position cursor at click position (simplified)
      const mouseX = this._p5Instance.mouseX;

      // Estimate cursor position based on click
      if (this._textAlign === 'left') {
        const clickOffset = mouseX - this._padding;
        let textWidth = 0;
        let position = 0;

        for (let i = 0; i <= this._text.length; i++) {
          const char = this._text.charAt(i);
          const charWidth = this._p5Instance.textWidth(char);

          if (textWidth + (charWidth / 2) > clickOffset) {
            position = i;
            break;
          }

          textWidth += charWidth;
          position = i + 1;
        }

        this._cursorPosition = Math.max(0, Math.min(position, this._text.length));
        this.redraw();
      }
    }
  }

  // ==================== Serialization ====================

  toJSON() {
    return {
      ...super.toJSON(),
      placeholder: this._placeholder,
      maxLength: this._maxLength,
      readOnly: this._readOnly,
      passwordChar: this._passwordChar,
      multiline: this._multiline,
      textAlign: this._textAlign
    };
  }

  // ==================== Cleanup ====================

  destroy() {
    this._stopCursorBlink();
    super.destroy();
  }
}
