import { obfuscate } from 'javascript-obfuscator';
import fs from 'fs';
import path from 'path';

const chunksDir = path.join(process.cwd(), '.next', 'static', 'chunks');
const files = fs.readdirSync(chunksDir).filter(f => f.endsWith('.js'));

for (const file of files) {
  const filePath = path.join(chunksDir, file);
  const code = fs.readFileSync(filePath, 'utf8');
  const result = obfuscate(code, {
    rotateStringArray: true,
    stringArray: true,
    stringArrayEncoding: ['base64'],
    stringArrayThreshold: 0.75,
    splitStrings: true,
    splitStringsChunkLength: 4,
    reservedNames: [
      'React', 'useState', 'useEffect', 'useMemo', 'useCallback', 'useRef',
      'useRouter', 'Component', '_jsx', '_jsxs', 'createElement', 'Fragment'
    ],
    disableConsoleOutput: true,
    selfDefending: false,
    debugProtection: false,
    transformObjectKeys: false,
  });
  fs.writeFileSync(filePath, result.getObfuscatedCode());
}

console.log('Обфускация завершена');