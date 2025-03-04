export interface Car {
  carId?: bigint,
  brand: string,
  model: string,
  inRental: boolean
}

export interface CarList {
  carList: Car[]
}
