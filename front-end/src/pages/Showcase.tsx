import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Button } from '../components/ui/button';
import { Tag } from '../components/ui/tag';
import { TransactionType } from '../components/ui/transaction-type';
import { Mail, UserPlus, Trash } from 'lucide-react';

export function Showcase() {
  return (
    <div className="min-h-screen bg-gray-50 p-8 space-y-8">
      <h1 className="text-2xl font-bold text-gray-800">UI Components System</h1>
      
      <section className="space-y-4 max-w-sm">
        <h2 className="text-xl font-semibold text-gray-700">Input / Select</h2>
        <div className="space-y-6">
          <div className="grid gap-2 grid-cols-[1fr_100px] items-center">
             <Input label="Label" placeholder="Placeholder" />
             <span className="text-sm font-mono text-gray-500">Empty</span>
          </div>

          <div className="grid gap-2 grid-cols-[1fr_100px] items-center">
             <Input label="Label" defaultValue="Text |" className="border-brand-base ring-2 ring-brand-base ring-offset-2" />
             <span className="text-sm font-mono text-gray-500">Active</span>
          </div>

           <div className="grid gap-2 grid-cols-[1fr_100px] items-center">
             <Input label="Label" icon={Mail} defaultValue="Text" />
             <span className="text-sm font-mono text-gray-500">Filled</span>
          </div>

           <div className="grid gap-2 grid-cols-[1fr_100px] items-center">
             <Input label="Label" icon={Mail} defaultValue="Text" error />
             <span className="text-sm font-mono text-gray-500">Error</span>
          </div>

           <div className="grid gap-2 grid-cols-[1fr_100px] items-center">
             <Input label="Label" icon={Mail} defaultValue="Text" disabled />
             <span className="text-sm font-mono text-gray-500">Disabled</span>
          </div>

          <div className="grid gap-2 grid-cols-[1fr_100px] items-start">
            <Select defaultValue="option1">
              <SelectTrigger label="Label" icon={Mail} className="w-full">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="option1">Option 1</SelectItem>
                <SelectItem value="option2">Option 2</SelectItem>
                <SelectItem value="option3">Option 3</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm font-mono text-gray-500 pt-8">Select</span>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-700">Buttons</h2>
        <div className="flex flex-wrap gap-4 items-center">
            <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">Solid</h3>
                <div className="flex gap-2 items-center">
                    <Button size="md">Md / Default</Button>
                    <Button size="sm">Sm / Default</Button>
                    <Button size="md" disabled>Md / Disabled</Button>
                     <Button size="sm" disabled>Sm / Disabled</Button>
                </div>
            </div>

            <div className="space-y-2">
                <h3 className="text-sm font-medium text-gray-500">Outline</h3>
                <div className="flex gap-2 items-center">
                    <Button variant="outline" size="md">Md / Default</Button>
                    <Button variant="outline" size="sm">Sm / Default</Button>
                    <Button variant="outline" size="md" disabled>Md / Disabled</Button>
                    <Button variant="outline" size="sm" disabled>Sm / Disabled</Button>
                </div>
            </div>

             <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-500">Icon Button</h3>
                <div className="flex gap-8 items-start">
                     <div className="grid gap-2 text-center">
                        <Button variant="outline" size="icon">
                            <UserPlus className="h-5 w-5" />
                        </Button>
                         <span className="text-xs text-gray-400">Default</span>
                         <Button variant="outline" size="icon" className="bg-gray-50">
                            <UserPlus className="h-5 w-5" />
                        </Button>
                        <span className="text-xs text-gray-400">Hover</span>
                         <Button variant="outline" size="icon" disabled>
                            <UserPlus className="h-5 w-5" />
                        </Button>
                        <span className="text-xs text-gray-400">Disabled</span>
                     </div>

                     <div className="grid gap-2 text-center">
                        <Button variant="danger" size="icon">
                            <Trash className="h-5 w-5" />
                        </Button>
                         <span className="text-xs text-gray-400">Default</span>
                         <Button variant="danger" size="icon" className="bg-[#FEE2E2]">
                            <Trash className="h-5 w-5" />
                        </Button>
                        <span className="text-xs text-gray-400">Hover</span>
                         <Button variant="danger" size="icon" disabled>
                            <Trash className="h-5 w-5" />
                        </Button>
                        <span className="text-xs text-gray-400">Disabled</span>
                     </div>
                     
                     <div className="flex flex-col gap-9 ml-4 text-sm font-mono text-gray-500 pt-3">
                         <span>Default</span>
                         <span>Hover</span>
                         <span>Active</span>
                         <span>Disabled</span>
                     </div>
                </div>
            </div>

             <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-500">Pagination Button</h3>
                <div className="flex gap-8 items-start">
                     <div className="grid gap-2 text-center">
                        <Button variant="outline" size="icon" className="h-10 w-10 border-gray-200 text-gray-600 hover:bg-white">
                            1
                        </Button>
                         <span className="text-xs text-gray-400">Default</span>
                         <Button variant="outline" size="icon" className="h-10 w-10 border-gray-200 bg-gray-200 text-gray-600 hover:bg-gray-200">
                            1
                        </Button>
                        <span className="text-xs text-gray-400">Hover</span>
                         <Button variant="default" size="icon" className="h-10 w-10">
                            1
                        </Button>
                        <span className="text-xs text-gray-400">Active</span>
                         <Button variant="outline" size="icon" className="h-10 w-10 border-gray-200 text-gray-300 pointer-events-none">
                            1
                        </Button>
                        <span className="text-xs text-gray-400">Disabled</span>
                     </div>
                     
                     <div className="flex flex-col gap-9 ml-4 text-sm font-mono text-gray-500 pt-3">
                         <span>Default</span>
                         <span>Hover</span>
                         <span>Active</span>
                         <span>Disabled</span>
                     </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-500">Tag</h3>
                <div className="flex flex-wrap gap-4">
                    <Tag>Label</Tag>
                    <Tag variant="blue">Label</Tag>
                    <Tag variant="purple">Label</Tag>
                    <Tag variant="pink">Label</Tag>
                    <Tag variant="red">Label</Tag>
                    <Tag variant="orange">Label</Tag>
                    <Tag variant="yellow">Label</Tag>
                    <Tag variant="green">Label</Tag>
                </div>
            </div>

             <div className="space-y-4">
                <h3 className="text-sm font-medium text-gray-500">Type</h3>
                <div className="flex flex-col gap-4">
                    <TransactionType variant="income" />
                    <TransactionType variant="outcome" />
                </div>
            </div>
        </div>
      </section>
    </div>
  );
}
