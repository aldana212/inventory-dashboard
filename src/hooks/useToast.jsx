import { toast } from "sonner";
import CustomToast from "../shared/components/CustomToast/CustomToast";
import CloseIcon from "../assets/icons/CloseIcon";
import CheckCircleIcon from "../assets/icons/CheckCircleIcon";
import InfoCircleIcon from "../assets/icons/InfoCircleIcon";
import DeleteIcon from "../assets/icons/DeleteIcon";

export const useToast = () => {
  const success = ({ title, description }) => {
    toast.custom((t) => (
      <CustomToast
        t={t}
        title={title}
        description={description}
        icon={
          <CheckCircleIcon className="w-[25px] text-[#16A34A] dark:text-[#10B981]" />
        }
        variant="success"
      />
    ));
  };

  const error = ({ title, description }) => {
    toast.custom((t) => (
      <CustomToast
        t={t}
        title={title}
        description={description}
        icon={
          <CloseIcon className="w-[15px] h-[15px] text-[#BA1A1A] dark:text-[#EF4444]" />
        }
        variant="error"
      />
    ));
  };

  const info = ({ title, description }) => {
    toast.custom((t) => (
      <CustomToast
        t={t}
        title={title}
        description={description}
        icon={
          <InfoCircleIcon className="w-[25px] text-[#515F74] dark:text-[#94A3B8]" />
        }
        variant="info"
      />
    ));
  };

  const loading = ({ title }) => {
    return toast.loading(title);
  };

  return {
    success,
    error,
    info,
    loading,
  };
};
