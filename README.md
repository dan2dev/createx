# createx

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Dev Dependencies](https://david-dm.org/dan2dev/createx/dev-status.svg)](https://david-dm.org/dan2dev/createx?type=dev)
[![Donate](https://img.shields.io/badge/donate-paypal-blue.svg)](https://paypal.me/dan2dev)

This library has the intention to help to generate code based on templates.

### Installation

```bash
npm install createx
```

### Usage

```typescript
// import
import { File, region } from 'createx';

// use
new File('./models/person.ts')
  .render(`
export class Person {
    ${region('generated',`
    name: string;
    phone: string;`)}
}
`).overwrite(false).overwriteRegions(true).save()
```

### Attention

#### This is an experimental library. Not yet ready for production.
