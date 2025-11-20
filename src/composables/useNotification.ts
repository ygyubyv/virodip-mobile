import { toastController } from "@ionic/vue";

export type ToastType = "success" | "error" | "warning" | "info";

const colorMap: Record<ToastType, string> = {
  success: "success",
  error: "danger",
  warning: "warning",
  info: "primary",
};

export const useNotification = () => {
  const showNotification = async (type: ToastType, message: string) => {
    const ionicColor = colorMap[type] ?? "primary";

    const toast = await toastController.create({
      message,
      duration: 3000,
      position: "top",
      color: ionicColor,
    });

    return toast.present();
  };

  return { showNotification };
};
