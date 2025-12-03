export const useCart = () => {
  const cartItems = ref<any[]>([]);
  const totalItems = ref(0);

  const updateCart = () => {
    if (import.meta.client) {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      cartItems.value = cart;
      totalItems.value = cart.reduce(
        (total: number, item: any) => total + item.quantity,
        0,
      );
    }
  };

  const handleStorageChange = () => {
    updateCart();
  };

  const handleCartUpdated = () => {
    updateCart();
  };

  onMounted(() => {
    updateCart();

    if (import.meta.client) {
      window.addEventListener("storage", handleStorageChange);
      window.addEventListener("cartUpdated", handleCartUpdated);
    }
  });

  onUnmounted(() => {
    if (import.meta.client) {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("cartUpdated", handleCartUpdated);
    }
  });

  return {
    cartItems,
    totalItems,
  };
};
