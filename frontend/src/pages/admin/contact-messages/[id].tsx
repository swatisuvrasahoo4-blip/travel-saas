import {
  ArrowLeft,
  CalendarDays,
  Mail,
  Phone,
  Trash2,
  User,
} from "lucide-react";
import { useRouter } from "next/router";
import {
  useEffect,
  useState,
} from "react";

import AdminLayout from "@/components/admin/layout/AdminLayout";
import ProtectedAdminRoute from "@/components/admin/auth/ProtectedAdminRoute";

import {
  AdminContactMessage,
  deleteAdminContactMessage,
  getAdminContactMessageById,
  markAdminContactMessageAsRead,
} from "@/services/adminContactMessageService";

const ContactMessageDetailsPage = () => {
  const router = useRouter();

  const { id } = router.query;

  const [
    contactMessage,
    setContactMessage,
  ] = useState<AdminContactMessage | null>(
    null
  );

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    isDeleting,
    setIsDeleting,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  useEffect(() => {
    if (
      !router.isReady ||
      typeof id !== "string"
    ) {
      return;
    }

    const loadMessage = async () => {
      try {
        setIsLoading(true);
        setError("");

        const response =
          await getAdminContactMessageById(
            id
          );

        let message =
          response.contactMessage;

        /*
         * Mark the message as read only after
         * successfully loading a message that
         * belongs to this authenticated agency.
         */
        if (
          message.status === "new"
        ) {
          const readResponse =
            await markAdminContactMessageAsRead(
              id
            );

          message = {
            ...message,
            status:
              readResponse.contactMessage
                .status,
            updatedAt:
              readResponse.contactMessage
                .updatedAt,
          };
        }

        setContactMessage(
          message
        );
      } catch (err) {
        console.error(
          "Unable to load contact message:",
          err
        );

        setError(
          "Contact message could not be loaded."
        );
      } finally {
        setIsLoading(false);
      }
    };

    loadMessage();
  }, [
    id,
    router.isReady,
  ]);

  const handleDelete = async () => {
    if (!contactMessage) {
      return;
    }

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this contact message?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setIsDeleting(true);

      await deleteAdminContactMessage(
        contactMessage._id
      );

      await router.push(
        "/admin/contact-messages"
      );
    } catch (err) {
      console.error(
        "Unable to delete contact message:",
        err
      );

      window.alert(
        "Unable to delete contact message."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  const formatDate = (
    value: string
  ) => {
    return new Date(
      value
    ).toLocaleString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  return (
    <ProtectedAdminRoute>
      <AdminLayout title="Contact Messages">
        <div className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() =>
                  router.push(
                    "/admin/contact-messages"
                  )
                }
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white text-gray-600 transition hover:bg-gray-50"
                aria-label="Back to contact messages"
              >
                <ArrowLeft
                  size={18}
                />
              </button>

              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Contact Message
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  View the complete
                  customer message.
                </p>
              </div>
            </div>

            {contactMessage && (
              <button
                type="button"
                disabled={
                  isDeleting
                }
                onClick={
                  handleDelete
                }
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-red-200 bg-white px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Trash2
                  size={17}
                />

                {isDeleting
                  ? "Deleting..."
                  : "Delete"}
              </button>
            )}
          </div>

          {isLoading ? (
            <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500 shadow-sm">
              Loading message...
            </div>
          ) : error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-700">
              {error}
            </div>
          ) : !contactMessage ? (
            <div className="rounded-xl border border-gray-200 bg-white p-10 text-center text-sm text-gray-500 shadow-sm">
              Contact message not
              found.
            </div>
          ) : (
            <>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                    <User
                      size={17}
                    />
                  </div>

                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Name
                  </p>

                  <p className="mt-1 break-words text-sm font-medium text-gray-900">
                    {contactMessage.name ||
                      "Not provided"}
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                    <Phone
                      size={17}
                    />
                  </div>

                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Phone
                  </p>

                  <p className="mt-1 break-words text-sm font-medium text-gray-900">
                    {
                      contactMessage.phone
                    }
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                    <Mail
                      size={17}
                    />
                  </div>

                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Email
                  </p>

                  <p className="mt-1 break-words text-sm font-medium text-gray-900">
                    {contactMessage.email ||
                      "Not provided"}
                  </p>
                </div>

                <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                  <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100 text-gray-600">
                    <CalendarDays
                      size={17}
                    />
                  </div>

                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Received
                  </p>

                  <p className="mt-1 text-sm font-medium text-gray-900">
                    {formatDate(
                      contactMessage.createdAt
                    )}
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-200 px-6 py-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                        Subject
                      </p>

                      <h2 className="mt-1 text-lg font-semibold text-gray-900">
                        {contactMessage.subject ||
                          "No subject"}
                      </h2>
                    </div>

                    <span className="inline-flex w-fit rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
                      Read
                    </span>
                  </div>
                </div>

                <div className="px-6 py-6">
                  <p className="mb-3 text-xs font-medium uppercase tracking-wide text-gray-400">
                    Message
                  </p>

                  <div className="whitespace-pre-wrap break-words text-sm leading-7 text-gray-700">
                    {
                      contactMessage.message
                    }
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </AdminLayout>
    </ProtectedAdminRoute>
  );
};

export default ContactMessageDetailsPage;