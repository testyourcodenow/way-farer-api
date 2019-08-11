import Booking from '../models/Booking'
import UserModel from '../models/User'
import TripModel from '../models/Trip'
import formatBooking from '../helpers/formatBookings'

class BookingService {
  static checkSeatingCapacity(seatingCapacity, bookedSeats) {
    return seatingCapacity >= bookedSeats
  }

  static async postBooking(req, res) {
    const user = await UserModel.getUserById(req.user.id)
    const trip = await TripModel.getTripById(req.body.tripId)
    if (!user && !trip) {
      return res.status(400).send({
        status: 400,
        message: 'User or Trip must exist ',
      })
    }
    const { numberOfSeats } = req.body
    const isSeatsAvailable = this.checkSeatingCapacity(
      trip.seating_capacity,
      numberOfSeats,
    )
    if (!isSeatsAvailable) {
      return res.status(202).send({
        status: 202,
        message: `Booking failed, only ${trip.seating_capacity} seats available`,
      })
    }
    req.body.userId = user.userId
    const booking = await Booking.createBooking(req.body)
    TripModel.updateSeatingCapacity(trip.trip_id, numberOfSeats)
    const bookedTrip = {
      booking_id: booking.bookingId,
      bus_number: trip.busNumber,
      trip_date: trip.tripDate,
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      number_of_seats: booking.numberOfSeats,
      created_on: booking.createdOn,
    }
    return res.status(201).send({
      status: 201,
      message: 'Booking created successfully',
      data: bookedTrip,
    })
  }

  static async getAll(req, res) {
    let bookings
    if (req.user.role === 'admin') {
      bookings = await Booking.getAllBookings()
    } else {
      bookings = await Booking.getBookingsByUserId(req.user.id)
    }

    if (!bookings.length) {
      return res.status(200).send({
        status: 200,
        message: 'There are no bookings',
      })
    }
    const formattedBookings = await Promise.all(
      bookings.map(booking => formatBooking(booking)),
    )
    return res.status(200).send({
      status: 200,
      message: 'Successfully retrieve all bookings',
      data: formattedBookings,
    })
  }

  static async deleteBooking(req, res) {
    const booking = Booking.getSpecificBooking(req.params.id)
    if (!booking) {
      return res.status(404).send({ status: 404, error: 'Booking not found' })
    }
    const message = Booking.deleteBooking(req.params.id)
    return res.status(204).send({ status: 204, message })
  }
}
export default BookingService
