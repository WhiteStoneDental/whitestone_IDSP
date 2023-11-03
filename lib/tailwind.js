import { create } from 'twrnc';
import resolveConfig from 'tailwindcss/resolveConfig.js'
import tailwindConfig from '../tailwind.config.js';

export default tw = create(tailwindConfig);
export const fullConfig = resolveConfig(tailwindConfig);