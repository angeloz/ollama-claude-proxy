import { P5Component } from '../core/P5Component.js';

/**
 * P5Label - VB6-style label component
 * Displays static or dynamic text with various formatting options
 */
export class P5Label extends P5Component {
  constructor(options = {}) {
    super({
      width: 100,
      height: 20,
      text: 'Label',
      backColor: 'transparent',
      foreColor: '#000000',
      borderColor: 'transparent',
      borderWidth: 0,
      fontSize: 14,
      enabled: false, // Labels are typically not interactive
      ...options
    });

    // Label-specific properties
    this._textAlign = options.textAlign || 'left'; // left, center, right
    this._verticalAlign = options.verticalAlign || 'top'; // top, center, bottom
    this._autoSize = options.autoSize !== undefined ? options.autoSize : false;
    this._wordWrap = options.wordWrap !== undefined ? options.wordWrap : false;
    this._padding = options.padding !== undefined ? options.padding : 0;
    this._fontStyle = options.fontStyle || 'normal'; // normal, bold, italic, bolditalic
    this._underline = options.underline || false;
    this._strikethrough = options.strikethrough || false;
  }

  // ==================== Additional Properties ====================

  get textAlign() { return this._textAlign; }
  set textAlign(value) {
    this._textAlign = value;
    this.redraw();
  }

  get verticalAlign() { return this._verticalAlign; }
  set verticalAlign(value) {
    this._verticalAlign = value;
    this.redraw();
  }

  get autoSize() { return this._autoSize; }
  set autoSize(value) {
    this._autoSize = value;
    if (value) {
      this._adjustSize();
    }
  }

  get wordWrap() { return this._wordWrap; }
  set wordWrap(value) {
    this._wordWrap = value;
    this.redraw();
  }

  get fontStyle() { return this._fontStyle; }
  set fontStyle(value) {
    this._fontStyle = value;
    this.redraw();
  }

  get underline() { return this._underline; }
  set underline(value) {
    this._underline = value;
    this.redraw();
  }

  get strikethrough() { return this._strikethrough; }
  set strikethrough(value) {
    this._strikethrough = value;
    this.redraw();
  }

  // Override text setter to handle autoSize
  set text(value) {
    this._text = value;
    this.emit('textChanged', value);
    if (this._autoSize) {
      this._adjustSize();
    }
    this.redraw();
  }

  // ==================== Rendering ====================

  setup(p) {
    p.noLoop(); // Only redraw when needed
    p.textFont(this._fontFamily);
    p.textSize(this._fontSize);

    if (this._autoSize) {
      this._adjustSize();
    }
  }

  draw(p) {
    p.clear();

    // Draw background if not transparent
    if (this._backColor !== 'transparent') {
      p.fill(this._backColor);
      p.noStroke();
      p.rect(0, 0, this._width, this._height);
    }

    // Draw border if specified
    if (this._borderColor !== 'transparent' && this._borderWidth > 0) {
      p.noFill();
      p.stroke(this._borderColor);
      p.strokeWeight(this._borderWidth);
      p.rect(0, 0, this._width, this._height);
    }

    // Set text properties
    p.textFont(this._fontFamily);
    p.textSize(this._fontSize);

    // Apply font style
    this._applyFontStyle(p);

    // Determine horizontal alignment
    let textAlignMode;
    let textX;

    switch (this._textAlign) {
      case 'center':
        textAlignMode = p.CENTER;
        textX = this._width / 2;
        break;
      case 'right':
        textAlignMode = p.RIGHT;
        textX = this._width - this._padding;
        break;
      default: // left
        textAlignMode = p.LEFT;
        textX = this._padding;
    }

    // Determine vertical alignment
    let textY;
    let verticalAlignMode;

    switch (this._verticalAlign) {
      case 'center':
        verticalAlignMode = p.CENTER;
        textY = this._height / 2;
        break;
      case 'bottom':
        verticalAlignMode = p.BOTTOM;
        textY = this._height - this._padding;
        break;
      default: // top
        verticalAlignMode = p.TOP;
        textY = this._padding;
    }

    p.textAlign(textAlignMode, verticalAlignMode);

    // Draw text
    p.fill(this._foreColor);
    p.noStroke();

    if (this._wordWrap) {
      this._drawWrappedText(p, textX, textY);
    } else {
      p.text(this._text, textX, textY);

      // Draw underline if enabled
      if (this._underline) {
        this._drawUnderline(p, textX, textY);
      }

      // Draw strikethrough if enabled
      if (this._strikethrough) {
        this._drawStrikethrough(p, textX, textY);
      }
    }
  }

  _applyFontStyle(p) {
    // Note: p5.js has limited font style support
    // This is a simplified implementation
    switch (this._fontStyle) {
      case 'bold':
        // p5.js doesn't have built-in bold, would need to use different font
        p.textStyle(p.BOLD);
        break;
      case 'italic':
        p.textStyle(p.ITALIC);
        break;
      case 'bolditalic':
        p.textStyle(p.BOLDITALIC);
        break;
      default:
        p.textStyle(p.NORMAL);
    }
  }

  _drawWrappedText(p, startX, startY) {
    const maxWidth = this._width - (this._padding * 2);
    const words = this._text.split(' ');
    const lines = [];
    let currentLine = '';

    // Build lines that fit within maxWidth
    for (const word of words) {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
      const testWidth = p.textWidth(testLine);

      if (testWidth > maxWidth && currentLine) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }

    if (currentLine) {
      lines.push(currentLine);
    }

    // Draw each line
    const lineHeight = this._fontSize * 1.2;
    let y = startY;

    // Adjust starting Y based on vertical alignment
    if (this._verticalAlign === 'center') {
      y = (this._height - (lines.length * lineHeight)) / 2;
    } else if (this._verticalAlign === 'bottom') {
      y = this._height - (lines.length * lineHeight) - this._padding;
    }

    for (let i = 0; i < lines.length; i++) {
      const lineY = y + (i * lineHeight) + (this._fontSize / 2);
      p.text(lines[i], startX, lineY);

      if (this._underline) {
        this._drawUnderline(p, startX, lineY);
      }

      if (this._strikethrough) {
        this._drawStrikethrough(p, startX, lineY);
      }
    }
  }

  _drawUnderline(p, x, y) {
    const textWidth = p.textWidth(this._text);
    let startX = x;

    if (this._textAlign === 'center') {
      startX = x - (textWidth / 2);
    } else if (this._textAlign === 'right') {
      startX = x - textWidth;
    }

    const underlineY = y + (this._fontSize / 2) + 2;

    p.stroke(this._foreColor);
    p.strokeWeight(1);
    p.line(startX, underlineY, startX + textWidth, underlineY);
  }

  _drawStrikethrough(p, x, y) {
    const textWidth = p.textWidth(this._text);
    let startX = x;

    if (this._textAlign === 'center') {
      startX = x - (textWidth / 2);
    } else if (this._textAlign === 'right') {
      startX = x - textWidth;
    }

    const strikeY = y;

    p.stroke(this._foreColor);
    p.strokeWeight(1);
    p.line(startX, strikeY, startX + textWidth, strikeY);
  }

  _adjustSize() {
    if (!this._p5Instance) return;

    const p = this._p5Instance;
    p.textFont(this._fontFamily);
    p.textSize(this._fontSize);

    const textWidth = p.textWidth(this._text);
    const textHeight = this._fontSize;

    this._width = textWidth + (this._padding * 2);
    this._height = textHeight + (this._padding * 2);

    this._resizeCanvas();
  }

  // ==================== VB6-like Methods ====================

  /**
   * Labels don't have interactive getValue
   */
  getValue() {
    return this._text;
  }

  /**
   * Labels don't typically have setValue, but included for consistency
   */
  setValue(value) {
    this.text = String(value);
  }

  // ==================== Serialization ====================

  toJSON() {
    return {
      ...super.toJSON(),
      textAlign: this._textAlign,
      verticalAlign: this._verticalAlign,
      autoSize: this._autoSize,
      wordWrap: this._wordWrap,
      padding: this._padding,
      fontStyle: this._fontStyle,
      underline: this._underline,
      strikethrough: this._strikethrough
    };
  }
}
