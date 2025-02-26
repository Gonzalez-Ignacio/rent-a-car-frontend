import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "../inputFields";
import { useForm } from "react-hook-form";
import { fetchAuthSession } from "@aws-amplify/auth";
import { createDocumentValidation } from "../../validation/Document/createDocumentValidation";
import { DocumentFormProps } from "../../interface/Document/documentFormProp.interface";
import { useCreateDocument } from "../../hook/document/useCreateDocument";
import { IDocumentCreate } from "../../interface/Document/documentCreate.interface";

export function DocumentForm({ fetchDocuments }: DocumentFormProps) {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createDocumentValidation),
  });

  const { createDocument } = useCreateDocument();
  const user = localStorage.getItem("user");
  const userUuid = user ? JSON.parse(user).uuid : null;

  const handleOnSubmit = async (data: IDocumentCreate) => {
    const session = await fetchAuthSession();
    const token = session.tokens?.accessToken.toString();

    if (!token) {
      console.error("User Unauthenticated");
      return;
    }

    if (!userUuid) {
      console.error("User not found");
      return;
    }

    try {
      const response = await createDocument(token, {
        ...data,
        userUuid: userUuid!,
      });
      console.log("User registered successfully:", response);
      fetchDocuments();
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleOnSubmit)} className="">
      <InputField
        id="url"
        label="Url"
        type="url"
        register={register}
        error={formState.errors?.url}
      />
      <InputField
        id="src"
        label="src"
        type="src"
        register={register}
        error={formState.errors?.src}
      />
      <InputField
        id="title"
        label="title"
        type="text"
        register={register}
        error={formState.errors?.title}
      />

      <div className="md:flex md:items-center mb-6">
        <div className="md:w-1/3">
          <label htmlFor="description">Description</label>
        </div>
        <div className="md:w-2/3">
          <textarea
            id="description"

            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 
            leading-tight focus:outline-none focus:bg-white focus:border-purple-500"

            {...register("description")}
            {...(formState.errors.description && (
              <span className="text-red-500">
                {formState.errors.description?.message}
              </span>
            ))}
          />
        </div>
      </div>

      <button className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white 
      font-bold py-2 px-4 rounded mt-4">
        Enviar
      </button>
    </form>
  );
}
