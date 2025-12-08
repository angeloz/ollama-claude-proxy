# p5-components 🎨

> Visual RAD System - VB6-inspired GUI Components Library built with p5.js

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![p5.js](https://img.shields.io/badge/p5.js-1.7.0+-pink.svg)](https://p5js.org/)
[![ES6+](https://img.shields.io/badge/JavaScript-ES6+-yellow.svg)](https://www.ecma-international.org/ecma-262/)

## 🚀 Overview

**p5-components** is a modern, lightweight library for building GUI applications using **p5.js** in instance mode. Inspired by the simplicity and power of Visual Basic 6, this library provides drag-and-drop ready components with familiar properties like `Text`, `Enabled`, `Visible`, `BackColor`, and more.

Perfect for:
- **Rapid Application Development (RAD)** 🏃‍♂️
- **Visual Programming Tools** 🎯
- **Educational Projects** 📚
- **Interactive Web Applications** 🌐
- **Prototyping GUI Interfaces** 🎨

## ✨ Key Features

- ✅ **VB6-like Properties**: `Text`, `Name`, `Enabled`, `Visible`, `BackColor`, `ForeColor`, `Width`, `Height`, `Left`, `Top`
- ✅ **Rich Event System**: `Click`, `Change`, `Focus`, `Blur`, `MouseEnter`, `MouseLeave`, `KeyPress`, etc.
- ✅ **State Management**: `normal`, `hover`, `active`, `disabled`, `focused`
- ✅ **JSON Serialization**: Save and load component configurations
- ✅ **Instance Mode p5.js**: Each component has its own canvas
- ✅ **Standard Methods**: `getValue()`, `setValue()`, `enable()`, `disable()`, `show()`, `hide()`
- ✅ **Zero Dependencies**: Only requires p5.js
- ✅ **Vanilla JavaScript**: Modern ES6+ code

## 📦 Installation

### Option 1: Direct Download

1. Clone or download this repository
2. Include p5.js in your HTML:

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js"></script>
```

3. Import components as ES6 modules:

```javascript
import { P5Button, P5TextBox, P5Label } from './src/index.js';
```

### Option 2: CDN (Coming Soon)

Package will be available on npm and CDN in future releases.

## 🎯 Quick Start

### Basic Example

```html
<!DOCTYPE html>
<html>
<head>
  <title>p5-components Demo</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.min.js"></script>
</head>
<body>
  <div id="app"></div>

  <script type="module">
    import { P5Button, P5TextBox, P5Label } from './src/index.js';

    // Create a label
    const label = new P5Label({
      text: 'Enter your name:',
      left: 20,
      top: 20,
      fontSize: 16
    });
    label._canvas.parent('app');

    // Create a text input
    const textBox = new P5TextBox({
      placeholder: 'Your name here...',
      left: 20,
      top: 50,
      width: 250,
      height: 35
    });
    textBox._canvas.parent('app');

    // Create a button
    const button = new P5Button({
      text: 'Submit',
      left: 20,
      top: 100,
      width: 100,
      height: 35,
      backColor: '#667eea',
      foreColor: '#FFFFFF'
    });
    button._canvas.parent('app');

    // Handle button click
    button.on('click', () => {
      const name = textBox.getValue();
      alert(`Hello, ${name}!`);
    });

    // Handle text changes
    textBox.on('change', (text) => {
      console.log('Text changed:', text);
    });
  </script>
</body>
</html>
```

## 📚 Components

### Available Components

| Component | Description | Status |
|-----------|-------------|--------|
| **P5Button** | Interactive button with hover/active states | ✅ Ready |
| **P5TextBox** | Text input with cursor and keyboard support | ✅ Ready |
| **P5Label** | Static/dynamic text display | ✅ Ready |
| **P5CheckBox** | Checkbox with checked state | 🚧 Coming Soon |
| **P5RadioButton** | Radio button for option groups | 🚧 Coming Soon |
| **P5ComboBox** | Dropdown selection list | 🚧 Coming Soon |
| **P5ListBox** | Scrollable list of items | 🚧 Coming Soon |
| **P5DataGrid** | Table/grid for data display | 🚧 Coming Soon |

### Component Examples

#### Button

```javascript
const btn = new P5Button({
  text: 'Click Me!',
  width: 120,
  height: 40,
  left: 10,
  top: 10,
  backColor: '#667eea',
  foreColor: '#FFFFFF',
  cornerRadius: 6
});

btn.on('click', () => {
  console.log('Button clicked!');
});

// Change properties dynamically
btn.text = 'Clicked!';
btn.enabled = false;
```

#### TextBox

```javascript
const textBox = new P5TextBox({
  placeholder: 'Type something...',
  width: 300,
  height: 35,
  maxLength: 50,
  textAlign: 'left'
});

textBox.on('change', (text) => {
  console.log('New text:', text);
});

textBox.on('submit', (text) => {
  console.log('Form submitted:', text);
});

// Methods
textBox.setValue('Hello World');
textBox.clear();
textBox.selectAll();
```

#### Label

```javascript
const label = new P5Label({
  text: 'Welcome!',
  fontSize: 24,
  fontStyle: 'bold',
  textAlign: 'center',
  foreColor: '#667eea'
});

// Dynamic updates
label.text = 'Updated Text';
label.underline = true;
label.wordWrap = true;
```

## 🎨 Styling & Customization

All components support extensive customization:

```javascript
const button = new P5Button({
  // VB6-like properties
  text: 'Custom Button',
  width: 150,
  height: 45,
  left: 50,
  top: 50,
  enabled: true,
  visible: true,

  // Colors
  backColor: '#667eea',
  foreColor: '#FFFFFF',
  hoverColor: '#5568d3',
  activeColor: '#4a5dc6',
  borderColor: '#4a5dc6',

  // Typography
  fontSize: 16,
  fontFamily: 'Arial',

  // Visual
  borderWidth: 2,
  cornerRadius: 8
});
```

## 🔥 Events

All components emit events you can listen to:

```javascript
component.on('click', () => { /* ... */ });
component.on('mouseEnter', () => { /* ... */ });
component.on('mouseLeave', () => { /* ... */ });
component.on('focus', () => { /* ... */ });
component.on('blur', () => { /* ... */ });
component.on('change', (value) => { /* ... */ });
component.on('keyPress', ({ key, keyCode }) => { /* ... */ });
```

## 💾 Serialization

Save and load component configurations:

```javascript
// Serialize to JSON
const json = button.toJSON();
console.log(json);

// Save to localStorage
localStorage.setItem('myButton', JSON.stringify(json));

// Restore from JSON
const savedJson = JSON.parse(localStorage.getItem('myButton'));
const restoredButton = new P5Button(savedJson);
```

## 📖 Documentation

- **[Full API Documentation](./docs/API.md)** - Complete reference for all components, properties, methods, and events
- **[Live Demo](./examples/index.html)** - Interactive examples of all components
- **[Usage Examples](./docs/API.md#usage-examples)** - Common patterns and recipes

## 🏗️ Architecture

```
p5-components/
├── src/
│   ├── core/
│   │   ├── EventEmitter.js    # Event handling system
│   │   └── P5Component.js     # Base component class
│   ├── components/
│   │   ├── Button.js          # Button component
│   │   ├── TextBox.js         # TextBox component
│   │   └── Label.js           # Label component
│   └── index.js               # Main export file
├── examples/
│   ├── index.html             # Demo page
│   └── demo.js                # Demo application
├── docs/
│   └── API.md                 # API documentation
├── package.json
└── README.md
```

## 🎯 Design Principles

1. **Simplicity First**: Easy to use, minimal learning curve
2. **VB6 Inspired**: Familiar properties and methods for rapid development
3. **Modern Stack**: ES6+ JavaScript, instance mode p5.js
4. **Zero External Dependencies**: Only p5.js required
5. **Modular Architecture**: Each component is self-contained
6. **Event-Driven**: Rich event system for interactivity
7. **JSON Serializable**: Save and load component configurations

## 🚀 Roadmap

### Phase 1: Core Components ✅
- [x] EventEmitter system
- [x] P5Component base class
- [x] Button component
- [x] TextBox component
- [x] Label component
- [x] Demo application
- [x] API documentation

### Phase 2: Advanced Components 🚧
- [ ] CheckBox component
- [ ] RadioButton component
- [ ] ComboBox component
- [ ] ListBox component
- [ ] DataGrid component

### Phase 3: Visual Designer 📋
- [ ] Drag & drop layout editor
- [ ] Grid-based positioning system
- [ ] WYSIWYG design interface
- [ ] Property inspector panel

### Phase 4: Runtime & Build 📋
- [ ] JSON layout interpreter
- [ ] API connector for REST services
- [ ] Electron packaging
- [ ] PWA support
- [ ] Tauri support (optional)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests.

### Development Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/p5-components.git
cd p5-components
```

2. Install dependencies (optional, for dev server):
```bash
npm install
```

3. Run demo:
```bash
npm run dev
# Open http://localhost:8080/index.html
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

- Inspired by **Visual Basic 6** and its rapid application development approach
- Built with **[p5.js](https://p5js.org/)** - a JavaScript library for creative coding
- Follows modern web standards and ES6+ best practices

## 📞 Support

- 📖 [Documentation](./docs/API.md)
- 💬 [Issues](https://github.com/yourusername/p5-components/issues)
- ⭐ Star this repo if you find it useful!

---

**Made with ❤️ for the RAD development community**
