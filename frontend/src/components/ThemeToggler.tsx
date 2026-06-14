import { Moon, Sun } from 'lucide-react'
import { Button } from './ui/button'
import { useTheme } from './ThemeProvider';

function ThemeToggler() {
    const { theme, setTheme } = useTheme();
    return (
        <div className='flex items-center'>
            <Button className='rounded-full' variant="ghost" size="icon-lg" onClick={() => theme === "dark" ? setTheme("light") : setTheme("dark")}>
                {theme === "light" ? <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" /> :
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />}
            </Button>
        </div >
    )
}

export default ThemeToggler