import type { NextConfig } from 'next';
import JavaScriptObfuscator from 'webpack-obfuscator';

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,

  webpack(config, { dev, isServer }) {
    if (!dev && !isServer) {
      config.plugins?.push(
        new JavaScriptObfuscator(
          {
            rotateStringArray: true,
            stringArray: true,
            stringArrayEncoding: ['base64'],
            stringArrayThreshold: 0.75,
            splitStrings: true,
            splitStringsChunkLength: 4,

            // Защищаем имена, критичные для React/Next.js
            reservedNames: [
              'React',
              'useState',
              'useEffect',
              'useMemo',
              'useCallback',
              'useRef',
              'useRouter',
              'Component',
              '_jsx',
              '_jsxs',
              'createElement',
              'Fragment',
            ],

            disableConsoleOutput: true,
            selfDefending: false,
            debugProtection: false,
            transformObjectKeys: false,
          },
          []
        )
      );
    }

    return config;
  },
};

export default nextConfig;