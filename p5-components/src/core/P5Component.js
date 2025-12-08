import { EventEmitter } from './EventEmitter.js';

/**
 * P5Component - Base class for all p5.js-based GUI components
 * Provides VB6-like properties and event handling
 */
export class P5Component extends EventEmitter {
  constructor(options = {}) {
    super();

    // VB6-like properties with defaults
    this._name = options.name || `component_${Date.now()}`;
    this._text = options.text || '';
    this._left = options.left || 0;
    this._top = options.top || 0;
    this._width = options.width || 100;
    this._height = options.height || 30;
    this._enabled = options.enabled !== undefined ? options.enabled : true;
    this._visible = options.visible !== undefined ? options.visible : true;
    this._backColor = options.backColor || '#FFFFFF';
    this._foreColor = options.foreColor || '#000000';
    this._fontSize = options.fontSize || 14;
    this._fontFamily = options.fontFamily || 'Arial';
    this._borderColor = options.borderColor || '#999999';
    this._borderWidth = options.borderWidth || 1;
    this._tabIndex = options.tabIndex || 0;

    // Component state
    this._state = 'normal'; // normal, hover, active, disabled, focused
    this._parent = options.parent || null;

    // p5 instance and canvas
    this._p5Instance = null;
    this._canvas = null;
    this._containerElement = null;

    // Mouse tracking
    this._mouseInside = false;
    this._mousePressed = false;

    // Initialize p5 instance
    this._initP5();
  }

  // ==================== VB6-like Properties ====================

  get name() { return this._name; }
  set name(value) { this._name = value; }

  get text() { return this._text; }
  set text(value) {
    this._text = value;
    this.emit('textChanged', value);
    this.redraw();
  }

  get left() { return this._left; }
  set left(value) {
    this._left = value;
    this._updatePosition();
  }

  get top() { return this._top; }
  set top(value) {
    this._top = value;
    this._updatePosition();
  }

  get width() { return this._width; }
  set width(value) {
    this._width = value;
    this._resizeCanvas();
  }

  get height() { return this._height; }
  set height(value) {
    this._height = value;
    this._resizeCanvas();
  }

  get enabled() { return this._enabled; }
  set enabled(value) {
    this._enabled = value;
    this._state = value ? 'normal' : 'disabled';
    this.emit('enabledChanged', value);
    this.redraw();
  }

  get visible() { return this._visible; }
  set visible(value) {
    this._visible = value;
    if (this._canvas) {
      this._canvas.style('display', value ? 'block' : 'none');
    }
    this.emit('visibleChanged', value);
  }

  get backColor() { return this._backColor; }
  set backColor(value) {
    this._backColor = value;
    this.redraw();
  }

  get foreColor() { return this._foreColor; }
  set foreColor(value) {
    this._foreColor = value;
    this.redraw();
  }

  get fontSize() { return this._fontSize; }
  set fontSize(value) {
    this._fontSize = value;
    this.redraw();
  }

  get fontFamily() { return this._fontFamily; }
  set fontFamily(value) {
    this._fontFamily = value;
    this.redraw();
  }

  get borderColor() { return this._borderColor; }
  set borderColor(value) {
    this._borderColor = value;
    this.redraw();
  }

  get borderWidth() { return this._borderWidth; }
  set borderWidth(value) {
    this._borderWidth = value;
    this.redraw();
  }

  get state() { return this._state; }

  // ==================== p5.js Instance Management ====================

  _initP5() {
    const sketch = (p) => {
      p.setup = () => {
        this._canvas = p.createCanvas(this._width, this._height);
        this._canvas.style('display', this._visible ? 'block' : 'none');
        this._canvas.position(this._left, this._top);

        // Setup mouse event handlers
        this._canvas.mousePressed(() => this._handleMousePressed());
        this._canvas.mouseReleased(() => this._handleMouseReleased());
        this._canvas.mouseOver(() => this._handleMouseOver());
        this._canvas.mouseOut(() => this._handleMouseOut());

        this.setup(p);
      };

      p.draw = () => {
        this.draw(p);
      };

      p.keyPressed = () => {
        if (this._state === 'focused') {
          this.handleKeyPressed(p);
        }
      };

      p.keyTyped = () => {
        if (this._state === 'focused') {
          this.handleKeyTyped(p);
        }
      };
    };

    this._p5Instance = new p5(sketch);
  }

  // ==================== Event Handlers ====================

  _handleMousePressed() {
    if (!this._enabled) return;

    this._mousePressed = true;
    this._state = 'active';
    this.emit('mouseDown', { x: this._p5Instance.mouseX, y: this._p5Instance.mouseY });
    this.redraw();
  }

  _handleMouseReleased() {
    if (!this._enabled) return;

    this._mousePressed = false;

    if (this._mouseInside) {
      this._state = 'hover';
      this.emit('click', { x: this._p5Instance.mouseX, y: this._p5Instance.mouseY });
    } else {
      this._state = 'normal';
    }

    this.emit('mouseUp', { x: this._p5Instance.mouseX, y: this._p5Instance.mouseY });
    this.redraw();
  }

  _handleMouseOver() {
    if (!this._enabled) return;

    this._mouseInside = true;
    if (!this._mousePressed) {
      this._state = 'hover';
    }
    this.emit('mouseEnter');
    this.redraw();
  }

  _handleMouseOut() {
    if (!this._enabled) return;

    this._mouseInside = false;
    if (!this._mousePressed) {
      this._state = 'normal';
    }
    this.emit('mouseLeave');
    this.redraw();
  }

  // ==================== Canvas Management ====================

  _updatePosition() {
    if (this._canvas) {
      this._canvas.position(this._left, this._top);
    }
  }

  _resizeCanvas() {
    if (this._p5Instance) {
      this._p5Instance.resizeCanvas(this._width, this._height);
      this.redraw();
    }
  }

  // ==================== VB6-like Methods ====================

  /**
   * Get the current value of the component
   * @returns {any} Component value
   */
  getValue() {
    return this._text;
  }

  /**
   * Set the value of the component
   * @param {any} value - New value
   */
  setValue(value) {
    this.text = String(value);
  }

  /**
   * Enable the component
   */
  enable() {
    this.enabled = true;
  }

  /**
   * Disable the component
   */
  disable() {
    this.enabled = false;
  }

  /**
   * Show the component
   */
  show() {
    this.visible = true;
  }

  /**
   * Hide the component
   */
  hide() {
    this.visible = false;
  }

  /**
   * Focus the component
   */
  focus() {
    if (this._enabled) {
      this._state = 'focused';
      this.emit('focus');
      this.redraw();
    }
  }

  /**
   * Blur (unfocus) the component
   */
  blur() {
    if (this._state === 'focused') {
      this._state = 'normal';
      this.emit('blur');
      this.redraw();
    }
  }

  /**
   * Redraw the component
   */
  redraw() {
    if (this._p5Instance) {
      this._p5Instance.redraw();
    }
  }

  /**
   * Destroy the component and cleanup
   */
  destroy() {
    this.emit('destroy');
    this.removeAllListeners();

    if (this._p5Instance) {
      this._p5Instance.remove();
      this._p5Instance = null;
    }

    this._canvas = null;
  }

  // ==================== Serialization ====================

  /**
   * Serialize component to JSON
   * @returns {Object} JSON representation
   */
  toJSON() {
    return {
      type: this.constructor.name,
      name: this._name,
      text: this._text,
      left: this._left,
      top: this._top,
      width: this._width,
      height: this._height,
      enabled: this._enabled,
      visible: this._visible,
      backColor: this._backColor,
      foreColor: this._foreColor,
      fontSize: this._fontSize,
      fontFamily: this._fontFamily,
      borderColor: this._borderColor,
      borderWidth: this._borderWidth,
      tabIndex: this._tabIndex
    };
  }

  /**
   * Restore component from JSON
   * @param {Object} json - JSON representation
   */
  fromJSON(json) {
    Object.keys(json).forEach(key => {
      if (key !== 'type' && this.hasOwnProperty(`_${key}`)) {
        this[key] = json[key];
      }
    });
  }

  // ==================== Abstract Methods (to be overridden) ====================

  /**
   * Setup method called once during p5 setup
   * @param {p5} p - p5 instance
   */
  setup(p) {
    // Override in subclass
  }

  /**
   * Draw method called every frame
   * @param {p5} p - p5 instance
   */
  draw(p) {
    // Override in subclass
    p.background(this._backColor);
  }

  /**
   * Handle key press events
   * @param {p5} p - p5 instance
   */
  handleKeyPressed(p) {
    // Override in subclass
  }

  /**
   * Handle key typed events
   * @param {p5} p - p5 instance
   */
  handleKeyTyped(p) {
    // Override in subclass
  }
}
