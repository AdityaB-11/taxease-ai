import '../styles/globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const isAppPage = router.pathname === '/app' || router.pathname === '/app-dashboard'

  return (
    <>
      {!isAppPage && <Header />}
      <Component {...pageProps} />
      {!isAppPage && <Footer />}
    </>
  )
}
