import SearchForm from './search_form'

export default function Home() {
  return (<>
    <div className="h-screen flex items-center justify-center dark:bg-slate-800">
      {/* Horizontally and Vertically Centered Element */}
      <SearchForm></SearchForm>
    </div>
  </>)
}
