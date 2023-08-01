/* @refresh reload */
import { render } from 'solid-js/web'

import '@/index.css'
import "leaflet/dist/leaflet.css";
import "leaflet-draw/dist/leaflet.draw.css";
import { App } from './App'

const root = document.getElementById('root')

render(() => <App />, root!)
