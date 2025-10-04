import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Loader2, Save, X, Edit3, RefreshCw } from "lucide-react";
import { useAuthStore } from "../Store/useAuthStore";

const ProfilePage = () => {
    const {
        userDetails,
        isFetchingUser,
        isUpdatingUser,
        fetchUserDetails,
        updateUserDetails,
    } = useAuthStore();

    const [localUser, setLocalUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchUserDetails();
    }, []);

    useEffect(() => {
        if (userDetails) setLocalUser(userDetails);
    }, [userDetails]);

    const handleChange = (field, value) => {
        setLocalUser((p) => ({ ...p, [field]: value }));
    };

    const handleSave = async () => {
        try {
            setIsEditing(false);
            await updateUserDetails({
                id: localUser.id,
                fullname: localUser.name,
                address: localUser.address,
                phone_number: localUser.phone_number,
            });
            toast.success("Profile updated");
        } catch (err) {
            toast.error("Update failed");
            setIsEditing(true);
        } finally {
            fetchUserDetails();
        }
    };

    if (isFetchingUser || !localUser)
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <div className="flex flex-col items-center text-black">
                    <Loader2 className="animate-spin" />
                    <p className="mt-2">Loading profile...</p>
                </div>
            </div>
        );

    return (
        <div className="w-full min-h-screen bg-white text-black px-6 py-10 flex flex-col items-center pt-30">
            {/* Header */}
            <div className="w-full max-w-3xl flex flex-col items-center border-gray-400 pb-6">
                <h1 className="text-3xl font-bold">{localUser.name}</h1>
                <p className="text-sm opacity-70">{localUser.email}</p>
                <p className="mt-1 text-xs opacity-60">
                    Member since{" "}
                    {new Date(localUser.created_at || localUser.created_on).toLocaleDateString()}
                </p>
            </div>

            {/* Form */}
            <div className="w-full max-w-3xl mt-8 space-y-6">
                <div>
                    <label className="block text-sm font-medium">Full name</label>
                    <input
                        className={`w-full border-b border-gray-400 focus:outline-none py-2 ${!isEditing && " cursor-not-allowed"
                            }`}
                        value={localUser.name || ""}
                        onChange={(e) => handleChange("fullname", e.target.value)}
                        disabled={!isEditing}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Phone number</label>
                    <input
                        className={`w-full border-b border-gray-400 focus:outline-none py-2 ${!isEditing && " cursor-not-allowed"
                            }`}
                        value={localUser.phone_number || localUser.phone || ""}
                        onChange={(e) => handleChange("phone_number", e.target.value)}
                        disabled={!isEditing}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Address</label>
                    <textarea
                        className={`w-full border-b border-gray-400 focus:outline-none py-2 resize-none ${!isEditing && " cursor-not-allowed"
                            }`}
                        value={localUser.address || ""}
                        onChange={(e) => handleChange("address", e.target.value)}
                        disabled={!isEditing}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        className="w-full border-b border-gray-400 focus:outline-none py-2  cursor-not-allowed"
                        value={localUser.email || ""}
                        disabled
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="w-full max-w-3xl mt-10 flex justify-between items-center border-gray-400 pt-6">
                <button
                    onClick={() => {
                        fetchUserDetails();
                        toast.success("Profile refreshed");
                    }}
                    className="flex items-center gap-2 border border-gray-400 px-4 py-2 hover:bg-black hover:text-white transition"
                >
                    <RefreshCw className="h-4 w-4" />
                    Refresh
                </button>

                <div className="flex gap-3">
                    {isUpdatingUser && (
                        <div className="flex items-center gap-2">
                            <Loader2 className="animate-spin" />
                            <span className="text-sm">Saving...</span>
                        </div>
                    )}
                    {!isEditing ? (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="flex items-center gap-2 border border-gray-400 px-4 py-2 hover:bg-black hover:text-white transition"
                        >
                            <Edit3 className="h-4 w-4" />
                            Edit
                        </button>
                    ) : (
                        <>
                            <button
                                onClick={handleSave}
                                disabled={isUpdatingUser}
                                className="flex items-center gap-2 border border-gray-400 px-4 py-2 hover:bg-black hover:text-white transition"
                            >
                                {isUpdatingUser ? (
                                    <Loader2 className="animate-spin" />
                                ) : (
                                    <Save className="h-4 w-4" />
                                )}
                                Save
                            </button>
                            <button
                                onClick={() => {
                                    setLocalUser(userDetails);
                                    setIsEditing(false);
                                }}
                                className="flex items-center gap-2 border border-gray-400 px-4 py-2 hover:bg-black hover:text-white transition"
                                disabled={isUpdatingUser}
                            >
                                <X className="h-4 w-4" />
                                Cancel
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
