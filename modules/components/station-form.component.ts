import Radio from "../subjects/Radio.js"

import Station from "../../interfaces/station.interface.js"
import ValidationResult from "../../interfaces/validate-result.interface.js"

const radio: Radio = Radio.getInstance()

type doneCallback = (result: Boolean, error: string | null) => void

class StationForm {

	private stationForm: HTMLFormElement
	private stations: Station[]

	public constructor(form: HTMLFormElement) {
		this.stationForm = form

		this.stationForm.onanimationend = () => {
			this.stationForm.classList.remove("wrong-animate")
		}

		this.stationsFeed = this.stationsFeed.bind(this)
		radio.subscribe(this.stationsFeed)
		this.submit = this.submit.bind(this)
		this.stationForm.addEventListener("submit", this.submit)
	}

	private submit(): void {
		event.preventDefault()
		
		let formData: FormData = new FormData(this.stationForm)
		let name: string = <string>formData.get("name")
		let code: number = parseFloat(<string>formData.get("code"))

		this.validate(name, code, (result: ValidationResult | null, error: string | null): void => {
			if(error) {
				this.stationForm.classList.add("wrong-animate")
				if(error) alert(error)
			} else if(result) {
				radio.addStation({name: result.name, code: result.code})
				this.stationForm.reset()
			}
		})
	}

	private validate(name: string, code: number, done: Function): doneCallback {
		if(!code) return done(null, "The code has to be a number")

		if(name !== "" && code) {

			if(this.stations) {
				let message = ""

				this.stations.forEach((station: Station) => {
					if(station.name === name) message = "Name already used"
					else if(station.code === code) message = "Code already used"
				})

				if(message) return done(null, message)
			}

			if(!Number.isInteger(code)) {
				return done({name, code: code}, null)
			} else return done(null, "The code must be an integer")
		} else return done(null, "Fill in all the fields")
	}

	private stationsFeed(stations: Station[]): void {
		this.stations = stations
	}
}

export default StationForm