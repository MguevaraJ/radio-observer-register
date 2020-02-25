import Radio from "../subjects/Radio.js"
import Station from "../../interfaces/station.interface.js"

import HTMLProperty from "../../interfaces/html-property.interface.js"
import StationListArgs from "../../interfaces/station-list-args.interface.js"

let radio = Radio.getInstance()

type Image = HTMLImageElement

class StationList {

	itemContainer: HTMLElement
	stationListCursor: HTMLElement
	stationList: HTMLElement
	withCourtain: Boolean

	courtain: HTMLElement
	toggle: Boolean = false

	public constructor(args: StationListArgs) {
		this.stationList = args.host
		this.itemContainer = args.container
		this.stationListCursor = args.action
		this.withCourtain = args.withCourtain || false

		this.clickCallback = this.clickCallback.bind(this)
		this.subscribeCallback = this.subscribeCallback.bind(this)

		this.generateCourtain(this.withCourtain)
		radio.subscribe(this.subscribeCallback)
		this.stationListCursor.addEventListener("click", this.clickCallback)
	}

	private generateCourtain(withCourtain: Boolean) {
		if(withCourtain) {
			const body = document.querySelector("body")
			const courtain = this.createElement(
				"div", 
				[{"name": "id", "value": "courtain"}], 
				["courtain"], 
				""
			)

			this.courtain = courtain
			body.appendChild(courtain)
		}
	}

	private clickCallback(event: Event) {
		const icon: Image = <Image>this.stationListCursor.children[0]

		this.toggle = this.toggle ? false : true

		if(this.toggle) icon.src = "../../assets/icons/arrow-close.svg"
		else icon.src = "../../assets/icons/arrow-open.svg"

		if(this.courtain) this.courtain.classList.toggle("courtain_show")
		this.stationList.classList.toggle("stationList_show")
	}

	private subscribeCallback(stations: Station[]) {
		this.itemContainer.innerHTML = ""
		if(stations.length) {
			stations.forEach((station: Station) => {
				const stationItem: HTMLElement = this.generateElement(station)
				this.itemContainer.appendChild(stationItem)
			})
		}
	}

	private generateElement(station: Station): HTMLElement {
		const Stationitem = this.createElement(
			"div", 
			[], 
			["stationList__item"], 
			""
		)

		const stationItemInfo = this.createElement(
			"div", 
			[], 
			["stationList__info"], 
			""
		)

		const stationItemName = this.createElement(
			"h3",
			[], 
			["stationList__name"], 
			station.name
		)

		const stationItemCode = this.createElement(
			"p", 
			[], 
			["stationList__code"], 
			station.code.toString()
		)

		stationItemInfo.appendChild(stationItemName)
		stationItemInfo.appendChild(stationItemCode)

		Stationitem.appendChild(stationItemInfo)

		const stationItemOff = this.createElement(
			"img", 
			[
				{"name": "id", "value": "stationListOff"},
				{"name": "src", "value": "./assets/icons/off.svg"}
			], 
			["stationList__off"],
			""
		)

		stationItemOff.onclick = () => radio.removeStation(station)

		Stationitem.appendChild(stationItemOff)

		return Stationitem
	}

	private createElement(
		type: string = "", 
		properties: HTMLProperty[] = [], 
		classNames: string[] = [],
		text: string
	): HTMLElement {
		let element = document.createElement(type)

		properties.forEach(property => {
			element.setAttribute(property.name, property.value)
		})

		classNames.forEach(className => {
			element.classList.add(className)
		})

		if(text !== "") element.appendChild(document.createTextNode(text))

		return element
	}
}

export default StationList