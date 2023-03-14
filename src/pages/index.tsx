import { Inter } from 'next/font/google'
import SearchForm from './search_form'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (<>
  <div className="h-screen flex items-center justify-center">
      {/* Horizontally and Vertically Centered Element */}
      <SearchForm></SearchForm>
  </div>
  </>)
}
