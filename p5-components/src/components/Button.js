import { P5Component } from '../core/P5Component.js';

/**
 * P5Button - VB6-style button component
 * Supports click events, hover effects, and disabled state
 */
export class P5Button extends P5Component {
  constructor(options = {}) {
    super({
      width: 100,
      height: 30,
      text: 'Button',
      backColor: '#E0E0E0',
      foreColor: '#000000',
      borderColor: '#999999',
      borderWidth: 1,
      fontSize: 14,
      ...options
    });

    // Button-specific properties
    this._hoverColor = options.hoverColor || '#D0D0D0';
    this._activeColor = options.activeColor || '#C0C0C0';
    this._disabledColor = options.disabledColor || '#F5F5F5';
    this._disabledTextColor = options.disabledTextColor || '#AAAAAA';
    this._cornerRadius = options.cornerRadius !== undefined ? options.cornerRadius : 4;
  }

  // ==================== Additional Properties ====================

  get hoverColor() { return this._hoverColor; }
  set hoverColor(value) {
    this._hoverColor = value;
    this.redraw();
  }

  get activeColor() { return this._activeColor; }
  set activeColor(value) {
    this._activeColor = value;
    this.redraw();
  }

  get disabledColor() { return this._disabledColor; }
  set disabledColor(value) {
    this._disabledColor = value;
    this.redraw();
  }

  get cornerRadius() { return this._cornerRadius; }
  set cornerRadius(value) {
    this._cornerRadius = value;
    this.redraw();
  }

  // ==================== Rendering ====================

  setup(p) {
    p.noLoop(); // Only redraw when needed
    p.textFont(this._fontFamily);
    p.textSize(this._fontSize);
    p.textAlign(p.CENTER, p.CENTER);
  }

  draw(p) {
    p.clear();

    // Determine background color based on state
    let bgColor;
    let textColor = this._foreColor;

    switch (this._state) {
      case 'disabled':
        bgColor = this._disabledColor;
        textColor = this._disabledTextColor;
        break;
      case 'hover':
        bgColor = this._hoverColor;
        break;
      case 'active':
        bgColor = this._activeColor;
        break;
      case 'focused':
        bgColor = this._hoverColor;
        break;
      default:
        bgColor = this._backColor;
    }

    // Draw button background
    p.fill(bgColor);
    p.stroke(this._borderColor);
    p.strokeWeight(this._borderWidth);

    if (this._cornerRadius > 0) {
      p.rect(0, 0, this._width, this._height, this._cornerRadius);
    } else {
      p.rect(0, 0, this._width, this._height);
    }

    // Draw focus indicator
    if (this._state === 'focused') {
      p.noFill();
      p.stroke('#4A90E2');
      p.strokeWeight(2);
      if (this._cornerRadius > 0) {
        p.rect(2, 2, this._width - 4, this._height - 4, this._cornerRadius);
      } else {
        p.rect(2, 2, this._width - 4, this._height - 4);
      }
    }

    // Draw button text
    p.fill(textColor);
    p.noStroke();
    p.textFont(this._fontFamily);
    p.textSize(this._fontSize);
    p.textAlign(p.CENTER, p.CENTER);
    p.text(this._text, this._width / 2, this._height / 2);

    // Draw pressed effect
    if (this._state === 'active') {
      p.fill(0, 0, 0, 20);
      p.noStroke();
      if (this._cornerRadius > 0) {
        p.rect(0, 0, this._width, this._height, this._cornerRadius);
      } else {
        p.rect(0, 0, this._width, this._height);
      }
    }
  }

  // ==================== Serialization ====================

  toJSON() {
    return {
      ...super.toJSON(),
      hoverColor: this._hoverColor,
      activeColor: this._activeColor,
      disabledColor: this._disabledColor,
      disabledTextColor: this._disabledTextColor,
      cornerRadius: this._cornerRadius
    };
  }
}
