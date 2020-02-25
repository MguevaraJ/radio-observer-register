import StationForm from "./modules/components/station-form.component.js"
import StationList from "./modules/components/station-list.component.js"

type Form = HTMLFormElement
type Button = HTMLButtonElement

const form: Form = <Form>document.getElementById("stationForm")

const list: HTMLElement = document.getElementById("stationList")
const listContainer: HTMLElement = document.getElementById("itemContainer")
const actionButton: Button = <Button>document.getElementById("stationListCursor")

new StationForm(form)
new StationList({
	"host": list, 
	"container": listContainer, 
	"action": actionButton, 
	"withCourtain": true 
})