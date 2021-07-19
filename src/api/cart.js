import AsyncStorage from "@react-native-async-storage/async-storage";
import { map, filter, size } from "lodash";
import { API_URL, CART } from "../utils/constants";
import { addOrderStatusApi } from "./orderstatus";

export const getProductCartApi = async () => {  
    try {
        const cart = await AsyncStorage.getItem(CART);
        if (!cart) return [];

        return JSON.parse(cart);
    } catch (error) {
        return null;
    }
};

export const addProductCartApi = async (idProduct, quantity) => {
    try {
        const cart = await getProductCartApi();        
        if (!cart) throw "Error al obtener el carrito";

        if (size(cart) === 0) {
            cart.push({
                idProduct,
                quantity,
            });
        } else {
            let found = false;
            map(cart, product => {
                if(product.idProduct === idProduct){
                    product.quantity += quantity;
                    found = true;
                    return product;
                }
            })

            if( !found ){
                cart.push({
                    idProduct,
                    quantity,
                });
            }
        }        
        await AsyncStorage.setItem( CART, JSON.stringify( cart ) )
        return true;        
    } catch (error) {
        return false;
    }
};

export async function deleteProductCartApi(idProduct) {
    try {
      const cart = await getProductCartApi();
      const newCart = filter(cart, (product) => {
        return product.idProduct !== idProduct;
      });
      await AsyncStorage.setItem(CART, JSON.stringify(newCart));
      return true;
    } catch (e) {
      return null;
    }
  }


export async function decreaseProductCartApi(idProduct) {
    let isDelete = false;
  
    try {
      const cart = await getProductCartApi();
      map(cart, (product) => {
        if (product.idProduct === idProduct) {
          if (product.quantity === 1) {
            isDelete = true;
            return null;
          } else {
            return (product.quantity -= 1);
          }
        }
      });
  
      if (isDelete) {
        await deleteProductCartApi(idProduct);
      } else {
        await AsyncStorage.setItem(CART, JSON.stringify(cart));
      }
  
      return true;
    } catch (e) {
      return null;
    }
  }
  
  export async function increaseProductCartApi(idProduct) {
    try {
      const cart = await getProductCartApi();
      map(cart, (product) => {
        if (product.idProduct === idProduct) {
          return (product.quantity += 1);
        }
      });

      console.log('incremetar')
      console.log(cart)
  
      await AsyncStorage.setItem(CART, JSON.stringify(cart));
      return true;
    } catch (e) {
      return null;
    }
  }

  export const paymentCartApi = async (auth, tokenStripe, products, address) =>{    
    try {
      const addressShipping = address;
      delete addressShipping.user;
      delete addressShipping.createdAt;

      const url = `${ API_URL }/orders`;
      const params = {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ auth.token }`  
        },
        body: JSON.stringify({
          tokenStripe,
          products,
          idUser: auth.idUser,
          addressShipping
        })
      }

      const response = await fetch(url, params);
      const result = await response.json();
      const data = {
        user: auth.idUser,
        idpayment: result[0]?.idPayment,
        address: addressShipping,        
      }

      await addOrderStatusApi(auth, data);
      return result;
    } catch (error) {
      console.log(error)
      return null;
    }
  }

  export async function deleteCartApi() {
    try {
      await AsyncStorage.removeItem(CART);
      return true;
    } catch (e) {
      return null;
    }
  }