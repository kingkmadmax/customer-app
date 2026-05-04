import api from "./api";

// This is a global function you can call from ANY page
export const createBooking = async (productId: number, userId: number | null) => {
  if (!userId) {
    alert("Please log in to rent gear!");
    return;
  }

  try {
    const response = await api.post('/bookings/create', {
      renterId: userId,
      productId: productId
    });
    return response.data;
  } catch (error) {
    console.error("Booking failed", error);
    throw error;
  }
};