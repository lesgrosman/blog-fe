import Header from './Header/Header'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      <div className='max-w-6xl m-auto w-full h-[calc(100vh-100px)] lg:px-0 px-8'>{children}</div>
    </div>
  )
}

export default Layout
