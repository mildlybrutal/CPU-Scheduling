"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

const sidebarItems = [
  { title: "Introduction", href: "/docs" },
  { title: "First Come First Serve (FCFS)", href: "/docs/fcfs" },
  { title: "Priority Scheduling", href: "/docs/priority" },
  { title: "Shortest Job First (SJF)", href: "/docs/sjf" },
  { title: "Round Robin", href: "/docs/round-robin" },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <div className="flex min-h-screen bg-gray-900">
      <aside className="fixed inset-y-0 z-30 flex w-72 flex-col border-r border-gray-800">
        <ScrollArea className="flex-1">
          <div className="px-6 py-6 border-b border-gray-800">
            <Link 
              href="/"
              className="inline-flex items-center text-sm text-gray-400 hover:text-white transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
          <nav className="px-3 py-6">
            {sidebarItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2 mb-1 rounded-md text-sm transition-colors ${
                  pathname === item.href
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                }`}
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </aside>
      <main className="flex-1 pl-72">
        <div className="mx-auto max-w-4xl p-10">
          {children}
        </div>
      </main>
    </div>
  );
} 