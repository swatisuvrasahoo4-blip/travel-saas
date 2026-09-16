import {
  Mail,
  Search,
  Trash2,
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
  ContactMessageStatus,
  deleteAdminContactMessage,
  getAdminContactMessages,
} from "@/services/adminContactMessageService";

const ContactMessagesPage = () => {
  const router = useRouter();

  const [
    messages,
    setMessages,
  ] = useState<AdminContactMessage[]>([]);

  const [
    search,
    setSearch,
  ] = useState("");

  const [
    status,
    setStatus,
  ] = useState<ContactMessageStatus | "">(
    ""
  );

  const [
    page,
    setPage,
  ] = useState(1);

  const [
    totalPages,
    setTotalPages,
  ] = useState(1);

  const [
    unreadCount,
    setUnreadCount,
  ] = useState(0);

  const [
    isLoading,
    setIsLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");

  const [
    deletingId,
    setDeletingId,
  ] = useState<string | null>(
    null
  );

  const loadMessages = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response =
        await getAdminContactMessages({
          page,
          limit: 10,
          search,
          status,
        });

      setMessages(
        response.messages
      );

      setUnreadCount(
        response.unreadCount
      );

      setTotalPages(
        response.pagination.totalPages ||
          1
      );
    } catch (err) {
      console.error(
        "Unable to load contact messages:",
        err
      );

      setError(
        "Unable to load contact messages."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeout = window.setTimeout(
      () => {
        loadMessages();
      },
      300
    );

    return () =>
      window.clearTimeout(
        timeout
      );
  }, [
    page,
    search,
    status,
  ]);

  const handleStatusChange = (
    value: string
  ) => {
    const nextStatus:
      | ContactMessageStatus
      | "" =
      value === "new" ||
      value === "read"
        ? value
        : "";

    setStatus(nextStatus);
    setPage(1);
  };

  const handleOpenMessage = async (
    message: AdminContactMessage
  ) => {
    await router.push(
      `/admin/contact-messages/${message._id}`
    );
  };

  const handleDelete = async (
    id: string
  ) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this message?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setDeletingId(id);

      await deleteAdminContactMessage(
        id
      );

      const deletedMessage =
        messages.find(
          (message) =>
            message._id === id
        );

      setMessages(
        (currentMessages) =>
          currentMessages.filter(
            (message) =>
              message._id !== id
          )
      );

      if (
        deletedMessage?.status ===
        "new"
      ) {
        setUnreadCount(
          (currentCount) =>
            Math.max(
              currentCount - 1,
              0
            )
        );
      }

      if (
        messages.length === 1 &&
        page > 1
      ) {
        setPage(
          (currentPage) =>
            Math.max(
              currentPage - 1,
              1
            )
        );
      }
    } catch (err) {
      console.error(
        "Unable to delete contact message:",
        err
      );

      window.alert(
        "Unable to delete contact message."
      );
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <ProtectedAdminRoute>
      <AdminLayout title="Contact Messages">
        <div className="space-y-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Contact Messages
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                View messages submitted
                through your travel agency
                website.
              </p>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 shadow-sm">
              <Mail
                size={18}
                className="text-gray-500"
              />

              <span className="text-sm font-medium text-gray-700">
                New Messages:
              </span>

              <span className="rounded-full bg-blue-50 px-2.5 py-1 text-sm font-semibold text-blue-700">
                {unreadCount}
              </span>
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="relative flex-1">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => {
                    setSearch(
                      event.target.value
                    );
                    setPage(1);
                  }}
                  placeholder="Search by name, email, phone or subject..."
                  className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              <select
                value={status}
                onChange={(event) =>
                  handleStatusChange(
                    event.target.value
                  )
                }
                className="rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              >
                <option value="">
                  All Messages
                </option>

                <option value="new">
                  New
                </option>

                <option value="read">
                  Read
                </option>
              </select>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            {isLoading ? (
              <div className="p-10 text-center text-sm text-gray-500">
                Loading messages...
              </div>
            ) : error ? (
              <div className="p-10 text-center text-sm text-red-600">
                {error}
              </div>
            ) : messages.length ===
              0 ? (
              <div className="p-10 text-center">
                <Mail
                  size={34}
                  className="mx-auto mb-3 text-gray-300"
                />

                <p className="text-sm font-medium text-gray-600">
                  No contact messages
                  found.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Sender
                      </th>

                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Subject
                      </th>

                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Message
                      </th>

                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Status
                      </th>

                      <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Date
                      </th>

                      <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {messages.map(
                      (message) => (
                        <tr
                          key={
                            message._id
                          }
                          onClick={() =>
                            handleOpenMessage(
                              message
                            )
                          }
                          className={`cursor-pointer transition hover:bg-gray-50 ${
                            message.status ===
                            "new"
                              ? "bg-blue-50/40"
                              : ""
                          }`}
                        >
                          <td className="px-5 py-4">
                            <div>
                              <p className="font-medium text-gray-900">
                                {message.name ||
                                  "Unknown"}
                              </p>

                              <p className="mt-1 text-xs text-gray-500">
                                {
                                  message.phone
                                }
                              </p>

                              {message.email && (
                                <p className="text-xs text-gray-500">
                                  {
                                    message.email
                                  }
                                </p>
                              )}
                            </div>
                          </td>

                          <td className="px-5 py-4 text-sm text-gray-700">
                            {message.subject ||
                              "No subject"}
                          </td>

                          <td className="max-w-[320px] px-5 py-4 text-sm text-gray-600">
                            <p className="truncate">
                              {
                                message.message
                              }
                            </p>
                          </td>

                          <td className="px-5 py-4">
                            <span
                              className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                                message.status ===
                                "new"
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-gray-100 text-gray-600"
                              }`}
                            >
                              {message.status ===
                              "new"
                                ? "New"
                                : "Read"}
                            </span>
                          </td>

                          <td className="px-5 py-4 text-sm text-gray-600">
                            {new Date(
                              message.createdAt
                            ).toLocaleDateString(
                              "en-IN",
                              {
                                day: "2-digit",
                                month:
                                  "short",
                                year:
                                  "numeric",
                              }
                            )}
                          </td>

                          <td className="px-5 py-4 text-right">
                            <button
                              type="button"
                              disabled={
                                deletingId ===
                                message._id
                              }
                              onClick={(
                                event
                              ) => {
                                event.stopPropagation();

                                handleDelete(
                                  message._id
                                );
                              }}
                              className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-red-500 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                              aria-label="Delete message"
                            >
                              <Trash2
                                size={
                                  17
                                }
                              />
                            </button>
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {!isLoading &&
              !error &&
              messages.length >
                0 && (
                <div className="flex items-center justify-between border-t border-gray-200 px-5 py-4">
                  <p className="text-sm text-gray-500">
                    Page {page} of{" "}
                    {totalPages}
                  </p>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      disabled={
                        page <= 1
                      }
                      onClick={() =>
                        setPage(
                          (current) =>
                            Math.max(
                              current -
                                1,
                              1
                            )
                        )
                      }
                      className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Previous
                    </button>

                    <button
                      type="button"
                      disabled={
                        page >=
                        totalPages
                      }
                      onClick={() =>
                        setPage(
                          (current) =>
                            Math.min(
                              current +
                                1,
                              totalPages
                            )
                        )
                      }
                      className="rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Next
                    </button>
                  </div>
                </div>
              )}
          </div>
        </div>
      </AdminLayout>
    </ProtectedAdminRoute>
  );
};

export default ContactMessagesPage;