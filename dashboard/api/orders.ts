import { API_URL } from "@/config";
import { cookies } from "next/headers";

export async function fetchOrders () {
    try {

        const token = cookies().get('token')?.value;
        const response = await fetch(`${API_URL}/orders`, {
            headers: {
                Authorization: token ?? '',
                'Contetnt-Type': 'aplication/json',
            },
        });
        if (!response.ok) {
            throw new Error('Failed to fetch orders');
        }

        const data = await response.json();
        return data;
    } catch (error){
        console.error(error);
        return[];
    }
}