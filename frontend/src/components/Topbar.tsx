import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { Bell, CupSoda, MessageCircle, Search } from 'lucide-react';
import { DropdownMenuAvatar } from './DropdownMenuAvatar';
import { Button } from './ui/button';

function Topbar() {
    return (
        <div className='sticky top-0 z-10 h-14 p-2 border-b bg-background px-2'>
            <div className='flex items-center gap-4 justify-between md:justify-around h-full'>
                <div className='flex items-center gap-2'>
                    <Button size="icon">
                        <CupSoda className="-rotate-16" />
                    </Button>
                    <p className='hidden md:block font-bold uppercase tracking-tight text-2xl md:text-3xl'>
                        Spill
                    </p>
                </div>
                <InputGroup className='hidden md:flex shrink grow max-w-2xl rounded-2xl'>
                    <InputGroupInput className='w-full' placeholder='Find anything' />
                    <InputGroupAddon>
                        <Search />
                    </InputGroupAddon>
                </InputGroup>
                <div className='flex gap-2 items-center'>
                    <Button className="rounded-full" size="icon" variant="ghost">
                        <MessageCircle />
                    </Button>
                    <Button className="rounded-full" size="icon" variant="ghost">
                        <Bell />
                    </Button>
                    <DropdownMenuAvatar />
                </div>
            </div>
        </div>)
}

export default Topbar