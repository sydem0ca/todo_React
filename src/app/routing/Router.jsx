import { useEffect, useState } from "react"
import TaskPage from "@/pages/TaskPage"

const matchPath = (path, route) => {
    const pathParts = path.split('/')
    const routesPaths = route.split('/')

    if (pathParts.length !== routesPaths.length) {
        return null
    }

    const params = {}

    for (let i = 0; i < pathParts.length; i++){
        if (routesPaths[i].startsWith(':')){
            const paramName = routesPaths[i].slice(1)

            params[paramName] = pathParts[i]
        } else if (routesPaths[i] !== pathParts[i]){
            return null
        }
    }

    return params
}

export const useRoute = () => {
    const [path, setPath] = useState(window.location.pathname)

    useEffect(() => {
        const onLocationChange = () => {
            setPath(window.location.pathname)
        }

        window.addEventListener('popstate', onLocationChange)

        return () =>{
            window.removeEventListener('popstate', onLocationChange)
        }
    }, [])

    return path
}

const Router = (props) => {
    const {routes} = props

    const path = useRoute()

    for (const route in routes) {
        const params = matchPath(path, route)

        if (params) {
            const Page = routes[route]

            return <Page params={params} />
        }
    }

    const NotFound = routes['*']

    return <NotFound />
}

export default Router