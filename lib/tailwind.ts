import { create } from 'twrnc';
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/tailwind.config';

export const tw = create(tailwindConfig);
export const fullConfig = resolveConfig(tailwindConfig);
