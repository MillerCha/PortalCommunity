import Link from "next/link";

export default function TopNav() {
    return (
        <header className="p-4 bg-slate-950">
            <nav className="bg-white shadow-md">
                <ul className="flex space-x-3">
                    <li>
                        <Link href="./">חוגים</Link>
                    </li>
                    <li>
                        <Link href="./">גיל הרך</Link>
                    </li>
                    <li>
                        <Link href="./">סיפריה</Link>
                    </li>
                    <li>
                        <Link href="./">גיל הזהב</Link>
                    </li>
                </ul>

            </nav>

        </header>
    )

} 