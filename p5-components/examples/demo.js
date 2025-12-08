/**
 * p5-components Demo Application
 * Interactive examples of Button, TextBox, and Label components
 */

import { P5Button } from '../src/components/Button.js';
import { P5TextBox } from '../src/components/TextBox.js';
import { P5Label } from '../src/components/Label.js';

// ==================== Global Component References ====================
let demoButton;
let demoTextBox;
let demoLabel1, demoLabel2, demoLabel3;

// State tracking
let labelAlignmentIndex = 0;
const labelAlignments = ['left', 'center', 'right'];
let labelStyleIndex = 0;
const labelStyles = [
  { fontStyle: 'normal', underline: false, strikethrough: false },
  { fontStyle: 'bold', underline: false, strikethrough: false },
  { fontStyle: 'italic', underline: false, strikethrough: false },
  { fontStyle: 'normal', underline: true, strikethrough: false },
  { fontStyle: 'normal', underline: false, strikethrough: true }
];

// ==================== Utility Functions ====================
function addOutput(elementId, message) {
  const output = document.getElementById(elementId);
  const line = document.createElement('div');
  line.className = 'output-line';
  line.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
  output.appendChild(line);

  // Keep only last 10 messages
  while (output.children.length > 10) {
    output.removeChild(output.firstChild);
  }

  // Scroll to bottom
  output.scrollTop = output.scrollHeight;
}

function showJSON(elementId, jsonData) {
  const jsonElement = document.getElementById(elementId);

  if (jsonElement.style.display === 'none') {
    jsonElement.style.display = 'block';
    jsonElement.textContent = JSON.stringify(jsonData, null, 2);
  } else {
    jsonElement.style.display = 'none';
  }
}

// ==================== Button Demo ====================
function initButtonDemo() {
  // Position button in the demo area
  const demoArea = document.getElementById('button-demo');
  const rect = demoArea.getBoundingClientRect();

  demoButton = new P5Button({
    text: 'Click Me!',
    width: 120,
    height: 40,
    left: 20,
    top: 20,
    backColor: '#667eea',
    foreColor: '#FFFFFF',
    hoverColor: '#5568d3',
    activeColor: '#4a5dc6',
    cornerRadius: 6,
    fontSize: 16
  });

  // Attach canvas to demo area
  demoButton._canvas.parent('button-demo');

  // Event listeners
  demoButton.on('click', () => {
    addOutput('button-output', '✓ Button clicked!');
  });

  demoButton.on('mouseEnter', () => {
    addOutput('button-output', '→ Mouse entered button');
  });

  demoButton.on('mouseLeave', () => {
    addOutput('button-output', '← Mouse left button');
  });

  demoButton.on('mouseDown', () => {
    addOutput('button-output', '⬇ Mouse down on button');
  });

  demoButton.on('mouseUp', () => {
    addOutput('button-output', '⬆ Mouse up on button');
  });

  addOutput('button-output', 'Button initialized');
}

window.toggleButton = function() {
  demoButton.enabled = !demoButton.enabled;
  addOutput('button-output', `Button ${demoButton.enabled ? 'enabled' : 'disabled'}`);
};

window.toggleButtonVisibility = function() {
  demoButton.visible = !demoButton.visible;
  addOutput('button-output', `Button ${demoButton.visible ? 'shown' : 'hidden'}`);
};

window.changeButtonText = function() {
  const texts = ['Click Me!', 'Press Here', 'Action', 'Submit', 'OK'];
  const randomText = texts[Math.floor(Math.random() * texts.length)];
  demoButton.text = randomText;
  addOutput('button-output', `Text changed to: "${randomText}"`);
};

window.showButtonJSON = function() {
  showJSON('button-json', demoButton.toJSON());
};

// ==================== TextBox Demo ====================
function initTextBoxDemo() {
  demoTextBox = new P5TextBox({
    text: '',
    placeholder: 'Type something...',
    width: 300,
    height: 35,
    left: 20,
    top: 20,
    backColor: '#FFFFFF',
    foreColor: '#000000',
    fontSize: 16,
    maxLength: 50
  });

  // Attach canvas to demo area
  demoTextBox._canvas.parent('textbox-demo');

  // Event listeners
  demoTextBox.on('change', (text) => {
    addOutput('textbox-output', `Text changed: "${text}"`);
  });

  demoTextBox.on('focus', () => {
    addOutput('textbox-output', '⚫ TextBox focused');
  });

  demoTextBox.on('blur', () => {
    addOutput('textbox-output', '⚪ TextBox blurred');
  });

  demoTextBox.on('keyPress', (data) => {
    addOutput('textbox-output', `Key pressed: "${data.key}"`);
  });

  demoTextBox.on('submit', (text) => {
    addOutput('textbox-output', `✓ Form submitted with: "${text}"`);
  });

  addOutput('textbox-output', 'TextBox initialized - Click to focus and type');
}

window.setTextBoxValue = function() {
  const sampleTexts = [
    'Hello World!',
    'p5-components rocks!',
    'VB6 meets modern web',
    'RAD development'
  ];
  const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
  demoTextBox.setValue(randomText);
  addOutput('textbox-output', `Value set to: "${randomText}"`);
};

window.clearTextBox = function() {
  demoTextBox.clear();
  addOutput('textbox-output', 'TextBox cleared');
};

window.toggleTextBoxReadOnly = function() {
  demoTextBox.readOnly = !demoTextBox.readOnly;
  addOutput('textbox-output', `TextBox is now ${demoTextBox.readOnly ? 'read-only' : 'editable'}`);
};

window.showTextBoxJSON = function() {
  showJSON('textbox-json', demoTextBox.toJSON());
};

// ==================== Label Demo ====================
function initLabelDemo() {
  // Label 1 - Standard label
  demoLabel1 = new P5Label({
    text: 'Welcome to p5-components!',
    width: 300,
    height: 30,
    left: 20,
    top: 20,
    foreColor: '#667eea',
    fontSize: 20,
    fontStyle: 'bold',
    textAlign: 'left'
  });
  demoLabel1._canvas.parent('label-demo');

  // Label 2 - Info label
  demoLabel2 = new P5Label({
    text: 'This is a label component with various styling options.',
    width: 400,
    height: 50,
    left: 20,
    top: 60,
    foreColor: '#333333',
    fontSize: 14,
    textAlign: 'left',
    wordWrap: true
  });
  demoLabel2._canvas.parent('label-demo');

  // Label 3 - Dynamic label
  demoLabel3 = new P5Label({
    text: 'Alignment: left',
    width: 300,
    height: 25,
    left: 20,
    top: 120,
    foreColor: '#764ba2',
    fontSize: 16,
    textAlign: 'left',
    backColor: '#f0f0f0',
    padding: 5
  });
  demoLabel3._canvas.parent('label-demo');

  addOutput('label-output', 'Labels initialized');
}

window.changeLabelText = function() {
  const texts = [
    'Welcome to p5-components!',
    'Visual RAD System',
    'Built with p5.js',
    'VB6-inspired Components',
    'Modern Web Development'
  ];
  const randomText = texts[Math.floor(Math.random() * texts.length)];
  demoLabel1.text = randomText;
  addOutput('label-output', `Label text changed to: "${randomText}"`);
};

window.cycleLabelAlignment = function() {
  labelAlignmentIndex = (labelAlignmentIndex + 1) % labelAlignments.length;
  const alignment = labelAlignments[labelAlignmentIndex];

  demoLabel3.textAlign = alignment;
  demoLabel3.text = `Alignment: ${alignment}`;

  addOutput('label-output', `Label alignment changed to: ${alignment}`);
};

window.toggleLabelStyle = function() {
  labelStyleIndex = (labelStyleIndex + 1) % labelStyles.length;
  const style = labelStyles[labelStyleIndex];

  demoLabel1.fontStyle = style.fontStyle;
  demoLabel1.underline = style.underline;
  demoLabel1.strikethrough = style.strikethrough;

  let styleName = style.fontStyle;
  if (style.underline) styleName += ' + underline';
  if (style.strikethrough) styleName += ' + strikethrough';

  addOutput('label-output', `Label style changed to: ${styleName}`);
};

window.showLabelJSON = function() {
  const allLabels = {
    label1: demoLabel1.toJSON(),
    label2: demoLabel2.toJSON(),
    label3: demoLabel3.toJSON()
  };
  showJSON('label-json', allLabels);
};

// ==================== Initialize All Demos ====================
function init() {
  console.log('Initializing p5-components demo...');

  try {
    initButtonDemo();
    initTextBoxDemo();
    initLabelDemo();

    console.log('All demos initialized successfully!');
  } catch (error) {
    console.error('Error initializing demos:', error);
  }
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
