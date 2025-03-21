import React from 'react';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import path from 'path';
import { promises as fs } from 'fs';
import { SimulatorButton } from '@/components/ui/simulator-button';

const components = {
  SimulatorButton
};

export default async function DocsPage() {
  const source = await fs.readFile(
    path.join(process.cwd(), 'src/app/docs/components/index.mdx'),
    'utf-8'
  );

  return (
    <div className="prose prose-invert max-w-none prose-headings:mb-6 prose-p:mb-4 prose-ul:my-4 prose-li:my-2">
      <MDXRemote source={source} components={components} />
    </div>
  );
} 