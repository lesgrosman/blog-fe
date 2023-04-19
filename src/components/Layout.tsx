import Header from './Header/Header'

interface Props {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Header />
      <div className='max-w-6xl m-auto w-full h-[calc(100vh-100px)]'>{children}</div>
    </div>
  )
}

export default Layout
