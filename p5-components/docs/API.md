# p5-components API Documentation

## Table of Contents

1. [Overview](#overview)
2. [Core Classes](#core-classes)
   - [EventEmitter](#eventemitter)
   - [P5Component](#p5component)
3. [Components](#components)
   - [P5Button](#p5button)
   - [P5TextBox](#p5textbox)
   - [P5Label](#p5label)
4. [Usage Examples](#usage-examples)
5. [Event Reference](#event-reference)

---

## Overview

p5-components is a Visual RAD (Rapid Application Development) system library inspired by VB6, built with modern web technologies. It provides a set of GUI components implemented using p5.js in instance mode, each with VB6-like properties and event handling.

### Key Features

- **VB6-like Properties**: Text, Name, Enabled, Visible, BackColor, ForeColor, Width, Height, Left, Top
- **Event System**: Click, Change, Focus, Blur, MouseEnter, MouseLeave, KeyPress, etc.
- **State Management**: normal, hover, active, disabled, focused
- **JSON Serialization**: Save and load component configurations
- **Instance Mode p5.js**: Each component has its own canvas
- **Standard Methods**: getValue(), setValue(), enable(), disable(), show(), hide()

---

## Core Classes

### EventEmitter

Simple event handling system implementing the observer pattern.

#### Methods

##### `on(event, callback)`
Register an event listener.

- **Parameters**:
  - `event` (string): Event name
  - `callback` (Function): Callback function
- **Returns**: Function to unsubscribe

**Example**:
```javascript
component.on('click', () => {
  console.log('Clicked!');
});
```

##### `once(event, callback)`
Register a one-time event listener.

- **Parameters**:
  - `event` (string): Event name
  - `callback` (Function): Callback function

##### `off(event, callback)`
Remove an event listener.

- **Parameters**:
  - `event` (string): Event name
  - `callback` (Function): Callback function to remove

##### `emit(event, ...args)`
Emit an event to all registered listeners.

- **Parameters**:
  - `event` (string): Event name
  - `...args` (any): Arguments to pass to listeners

##### `removeAllListeners([event])`
Remove all listeners for an event or all events.

- **Parameters**:
  - `event` (string, optional): Event name

##### `listenerCount(event)`
Get the number of listeners for an event.

- **Parameters**:
  - `event` (string): Event name
- **Returns**: number

---

### P5Component

Base class for all p5.js-based GUI components. Provides VB6-like properties and event handling.

#### Constructor

```javascript
new P5Component(options)
```

**Options**:
- `name` (string): Component name (default: auto-generated)
- `text` (string): Component text content (default: '')
- `left` (number): X position (default: 0)
- `top` (number): Y position (default: 0)
- `width` (number): Component width (default: 100)
- `height` (number): Component height (default: 30)
- `enabled` (boolean): Enable/disable state (default: true)
- `visible` (boolean): Visibility state (default: true)
- `backColor` (string): Background color (default: '#FFFFFF')
- `foreColor` (string): Foreground/text color (default: '#000000')
- `fontSize` (number): Font size (default: 14)
- `fontFamily` (string): Font family (default: 'Arial')
- `borderColor` (string): Border color (default: '#999999')
- `borderWidth` (number): Border width (default: 1)
- `tabIndex` (number): Tab order (default: 0)

#### Properties

All properties have getters and setters:

- `name`: Component name
- `text`: Component text content
- `left`: X position
- `top`: Y position
- `width`: Component width
- `height`: Component height
- `enabled`: Enable/disable state
- `visible`: Visibility state
- `backColor`: Background color
- `foreColor`: Foreground/text color
- `fontSize`: Font size
- `fontFamily`: Font family
- `borderColor`: Border color
- `borderWidth`: Border width
- `state`: Current state (read-only: 'normal', 'hover', 'active', 'disabled', 'focused')

#### Methods

##### `getValue()`
Get the current value of the component.

- **Returns**: any

##### `setValue(value)`
Set the value of the component.

- **Parameters**:
  - `value` (any): New value

##### `enable()`
Enable the component.

##### `disable()`
Disable the component.

##### `show()`
Show the component.

##### `hide()`
Hide the component.

##### `focus()`
Focus the component.

##### `blur()`
Blur (unfocus) the component.

##### `redraw()`
Redraw the component.

##### `destroy()`
Destroy the component and cleanup resources.

##### `toJSON()`
Serialize component to JSON.

- **Returns**: Object

##### `fromJSON(json)`
Restore component from JSON.

- **Parameters**:
  - `json` (Object): JSON representation

#### Events

- `textChanged`: Fired when text property changes
- `enabledChanged`: Fired when enabled property changes
- `visibleChanged`: Fired when visible property changes
- `click`: Fired on mouse click
- `mouseDown`: Fired on mouse press
- `mouseUp`: Fired on mouse release
- `mouseEnter`: Fired when mouse enters component
- `mouseLeave`: Fired when mouse leaves component
- `focus`: Fired when component receives focus
- `blur`: Fired when component loses focus
- `destroy`: Fired when component is destroyed

---

## Components

### P5Button

VB6-style button component with click events, hover effects, and disabled state.

#### Constructor

```javascript
new P5Button(options)
```

Extends P5Component with additional options:
- `hoverColor` (string): Color when hovering (default: '#D0D0D0')
- `activeColor` (string): Color when active/pressed (default: '#C0C0C0')
- `disabledColor` (string): Color when disabled (default: '#F5F5F5')
- `disabledTextColor` (string): Text color when disabled (default: '#AAAAAA')
- `cornerRadius` (number): Corner radius for rounded corners (default: 4)

#### Additional Properties

- `hoverColor`: Color when hovering
- `activeColor`: Color when active/pressed
- `disabledColor`: Color when disabled
- `disabledTextColor`: Text color when disabled
- `cornerRadius`: Corner radius

#### Example

```javascript
const btn = new P5Button({
  text: 'Click Me!',
  width: 120,
  height: 40,
  left: 20,
  top: 20,
  backColor: '#667eea',
  foreColor: '#FFFFFF',
  cornerRadius: 6
});

btn.on('click', () => {
  console.log('Button clicked!');
});

// Change properties
btn.text = 'New Text';
btn.enabled = false;

// Serialize
const json = btn.toJSON();
```

---

### P5TextBox

VB6-style text input component with text input, selection, cursor, and keyboard support.

#### Constructor

```javascript
new P5TextBox(options)
```

Extends P5Component with additional options:
- `placeholder` (string): Placeholder text (default: '')
- `placeholderColor` (string): Placeholder color (default: '#AAAAAA')
- `maxLength` (number): Maximum text length (default: 255)
- `readOnly` (boolean): Read-only state (default: false)
- `passwordChar` (string): Password character (default: null, set to '*' for password fields)
- `multiline` (boolean): Multiline support (default: false)
- `textAlign` (string): Text alignment - 'left', 'center', 'right' (default: 'left')
- `focusBorderColor` (string): Border color when focused (default: '#4A90E2')
- `padding` (number): Internal padding (default: 5)

#### Additional Properties

- `placeholder`: Placeholder text
- `maxLength`: Maximum text length
- `readOnly`: Read-only state
- `passwordChar`: Password character
- `multiline`: Multiline support
- `textAlign`: Text alignment

#### Additional Methods

##### `clear()`
Clear all text.

##### `selectAll()`
Select all text.

##### `getSelectedText()`
Get selected text.

- **Returns**: string

#### Additional Events

- `change`: Fired when text changes (passes new text)
- `keyPress`: Fired on key press (passes { key, keyCode })
- `submit`: Fired on Enter key (non-multiline only, passes text)

#### Example

```javascript
const textBox = new P5TextBox({
  placeholder: 'Enter your name...',
  width: 300,
  height: 35,
  left: 20,
  top: 20,
  maxLength: 50
});

textBox.on('change', (text) => {
  console.log('Text changed:', text);
});

textBox.on('submit', (text) => {
  console.log('Form submitted:', text);
});

// Set value
textBox.setValue('Hello World');

// Clear
textBox.clear();

// Toggle read-only
textBox.readOnly = true;
```

---

### P5Label

VB6-style label component for displaying static or dynamic text with various formatting options.

#### Constructor

```javascript
new P5Label(options)
```

Extends P5Component with additional options:
- `textAlign` (string): Horizontal alignment - 'left', 'center', 'right' (default: 'left')
- `verticalAlign` (string): Vertical alignment - 'top', 'center', 'bottom' (default: 'top')
- `autoSize` (boolean): Auto-resize to fit text (default: false)
- `wordWrap` (boolean): Enable word wrapping (default: false)
- `padding` (number): Internal padding (default: 0)
- `fontStyle` (string): Font style - 'normal', 'bold', 'italic', 'bolditalic' (default: 'normal')
- `underline` (boolean): Underline text (default: false)
- `strikethrough` (boolean): Strikethrough text (default: false)

#### Additional Properties

- `textAlign`: Horizontal alignment
- `verticalAlign`: Vertical alignment
- `autoSize`: Auto-resize to fit text
- `wordWrap`: Enable word wrapping
- `fontStyle`: Font style
- `underline`: Underline text
- `strikethrough`: Strikethrough text

#### Example

```javascript
const label = new P5Label({
  text: 'Welcome to p5-components!',
  width: 300,
  height: 30,
  left: 20,
  top: 20,
  foreColor: '#667eea',
  fontSize: 20,
  fontStyle: 'bold',
  textAlign: 'center'
});

// Change text
label.text = 'New Label Text';

// Change alignment
label.textAlign = 'right';

// Enable underline
label.underline = true;

// Enable word wrap for long text
label.wordWrap = true;
label.width = 200;
label.text = 'This is a long text that will wrap to multiple lines';
```

---

## Usage Examples

### Basic Setup

```html
<!DOCTYPE html>
<html>
<head>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js"></script>
</head>
<body>
  <div id="app"></div>
  <script type="module">
    import { P5Button, P5TextBox, P5Label } from './src/index.js';

    // Create components
    const button = new P5Button({
      text: 'Submit',
      width: 100,
      height: 35,
      left: 20,
      top: 100
    });

    const textBox = new P5TextBox({
      placeholder: 'Enter text...',
      width: 200,
      height: 35,
      left: 20,
      top: 50
    });

    const label = new P5Label({
      text: 'Name:',
      width: 100,
      height: 25,
      left: 20,
      top: 20
    });

    // Attach to page
    button._canvas.parent('app');
    textBox._canvas.parent('app');
    label._canvas.parent('app');

    // Handle events
    button.on('click', () => {
      const value = textBox.getValue();
      alert(`Submitted: ${value}`);
    });
  </script>
</body>
</html>
```

### Form Example

```javascript
import { P5Button, P5TextBox, P5Label } from './src/index.js';

// Create a simple form
const form = {
  nameLabel: new P5Label({
    text: 'Name:',
    left: 20, top: 20
  }),
  nameInput: new P5TextBox({
    placeholder: 'Your name',
    left: 20, top: 50,
    width: 250
  }),

  emailLabel: new P5Label({
    text: 'Email:',
    left: 20, top: 100
  }),
  emailInput: new P5TextBox({
    placeholder: 'your@email.com',
    left: 20, top: 130,
    width: 250
  }),

  submitBtn: new P5Button({
    text: 'Submit',
    left: 20, top: 180,
    width: 100, height: 35
  })
};

// Handle submission
form.submitBtn.on('click', () => {
  const data = {
    name: form.nameInput.getValue(),
    email: form.emailInput.getValue()
  };
  console.log('Form data:', data);
});

// Validate on change
form.emailInput.on('change', (text) => {
  const isValid = text.includes('@');
  form.emailInput.borderColor = isValid ? '#00AA00' : '#AA0000';
});
```

### Serialization Example

```javascript
// Create components
const button = new P5Button({
  text: 'Save',
  width: 100,
  height: 35,
  left: 20,
  top: 20
});

// Serialize to JSON
const json = button.toJSON();
console.log(json);
/* Output:
{
  "type": "P5Button",
  "name": "component_1234567890",
  "text": "Save",
  "left": 20,
  "top": 20,
  "width": 100,
  "height": 35,
  "enabled": true,
  "visible": true,
  "backColor": "#E0E0E0",
  "foreColor": "#000000",
  ...
}
*/

// Save to localStorage
localStorage.setItem('myButton', JSON.stringify(json));

// Load and restore
const savedJson = JSON.parse(localStorage.getItem('myButton'));
const restoredButton = new P5Button(savedJson);
```

---

## Event Reference

### Common Events (All Components)

| Event | Parameters | Description |
|-------|-----------|-------------|
| `click` | `{ x, y }` | Fired when component is clicked |
| `mouseDown` | `{ x, y }` | Fired when mouse button is pressed |
| `mouseUp` | `{ x, y }` | Fired when mouse button is released |
| `mouseEnter` | none | Fired when mouse enters component area |
| `mouseLeave` | none | Fired when mouse leaves component area |
| `focus` | none | Fired when component receives focus |
| `blur` | none | Fired when component loses focus |
| `textChanged` | `text` (string) | Fired when text property changes |
| `enabledChanged` | `enabled` (boolean) | Fired when enabled property changes |
| `visibleChanged` | `visible` (boolean) | Fired when visible property changes |
| `destroy` | none | Fired when component is destroyed |

### TextBox Specific Events

| Event | Parameters | Description |
|-------|-----------|-------------|
| `change` | `text` (string) | Fired when text content changes |
| `keyPress` | `{ key, keyCode }` | Fired when a key is pressed |
| `submit` | `text` (string) | Fired when Enter key is pressed (non-multiline) |

---

## Best Practices

1. **Memory Management**: Always call `destroy()` when removing components
2. **Event Cleanup**: Use the returned unsubscribe function or `removeAllListeners()`
3. **Canvas Parenting**: Attach canvas to DOM elements using `component._canvas.parent('element-id')`
4. **State Management**: Check component state before performing operations
5. **Serialization**: Use `toJSON()` for saving layouts, restore with constructor options

---

## Browser Support

- Modern browsers with ES6+ support
- p5.js 1.7.0 or higher required
- No additional dependencies

---

## License

MIT License - See LICENSE file for details
