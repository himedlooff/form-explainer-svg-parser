# form-explainer-svg-parser.js

A Node.js command line utility for converting SVG to JSON.
Tailored for use with CFPB's Owning A Home: Form Explainer tool.

## Dependencies

Node, [install it](http://nodejs.org/) however you'd like.

## Installation

### Via cloning

1. Clone this repository locally
2. Install the project's node dependencies:
```bash
$ npm install
```

### Todo: Create as an NPM package for easier installation

## Usage

In Adobe Illustrator, create some rectangles.
Name each rectangle by editing its layer name.

The naming convetion is as follows:

`[category]_[id]`

Where `[category]` is one of the following: "checklist", "alerts", "definitions",
and `[id]` is a unique name per category.

Here are some examples of valid names:

```
checklist_estimate
checklist_loan-estimate
alerts_estimate
alerts_loan-estimate
definitions_estimate
definitions_loan-estimate
```

Save the file as SVG.
It should look something like following example.
Your might have more "stuff", that's ok, as long as it has everything you see
in the example.

```svg
<svg viewBox="0 0 705 912">
  <rect id="alert_x5F_estimated-closing" x="215.6" y="819.6" width="441.3" height="40.9"/>
  <rect id="definition_x5F_estimated-closing" x="49.8" y="819.6" width="164.7" height="40.9"/>
  <rect id="checklist_x5F_estimated-closing" x="332.4" y="93.8" width="334.5" height="57.9"/>
</svg>
```

To convert the SVG file run this script, passing it the path to the SVG file.

```bash
$ node form-explainer-svg-parser.js my-file.svg
```

## Contributions
We welcome contributions, in both code and design form, with the understanding that you are contributing to a project that is in the public domain, and anything you contribute to this project will also be released into the public domain. See our [CONTRIBUTING file](CONTRIBUTING.md) for more details.

----

## Open source licensing info
1. [TERMS](TERMS.md)
2. [LICENSE](LICENSE)
3. [CFPB Source Code Policy](https://github.com/cfpb/source-code-policy/)

----

## Credits and references

1. Inspired by <https://github.com/chrisfinch/svg-to-json>
