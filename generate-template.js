// Run this once to generate the base PDF template
import { downloadBasePdfTemplate } from './src/utils/createBasePdf.js';

console.log('Generating base PDF template...');
downloadBasePdfTemplate().then(() => {
  console.log('Base template generated! Save it as public/pdf-template.pdf');
}).catch(console.error);