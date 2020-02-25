import Station from "../../interfaces/station.interface.js"

class Radio {
	private static instance: Radio
	private activeStations: Station[] = []
	private observers: Function[] = []
	private value: string = ""

	private constructor() {}

	public static getInstance() {
		if(!this.instance) this.instance = new Radio()

		return this.instance
	}

	public subscribe(callback: Function) {
		this.observers = [...this.observers, callback]
	}

	public addStation(station: Station) {
		if(this.activeStations.length < 8) {
			this.activeStations = [...this.activeStations, station]
			this.observers.forEach(observer => observer(this.activeStations))
		} else {
			alert("There can only be a maximum of 8 active stations.")
		}
	}

	public removeStation(station: Station) {
		let strStation = JSON.stringify(station)

		this.activeStations = this.activeStations.filter(activeStation => {
			return JSON.stringify(activeStation) !== strStation
		})

		this.observers.forEach(observer => observer(this.activeStations))
	}
}

export default Radio