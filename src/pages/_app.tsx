import '@/styles/globals.css'
import 'react-quill/dist/quill.snow.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useInitUser } from '@/utils/auth/hooks/useInitUser'
import AxiosProvider from '@/providers/axios'
import Layout from '@/components/Layout'
import type { AppProps } from 'next/app'

const queryClient = new QueryClient()

const App = ({ Component, pageProps }: AppProps) => {
  const loading = useInitUser()

  if (loading) return <h1>Loading</h1>

  return (
    <AxiosProvider>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </QueryClientProvider>
    </AxiosProvider>
  )
}

export default App
