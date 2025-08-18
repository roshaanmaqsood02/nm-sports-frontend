import { PlayerCardProps } from "../types/player";

export default function PlayerCard({
  player,
  onEdit,
  onDelete,
}: PlayerCardProps) {
  // Calculate age safely from dateOfBirth
  const calculateAge = (dob?: string | Date) => {
    if (!dob) return "N/A";

    try {
      const birthDate = new Date(dob);
      if (isNaN(birthDate.getTime())) return "Invalid date";

      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      return age;
    } catch (error) {
      console.error("Error calculating age:", error);
      return "N/A";
    }
  };

  // Format date to readable format safely
  const formatDate = (dateString?: string | Date) => {
    if (!dateString) return "N/A";

    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Invalid date";

      return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "N/A";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden transition-all hover:shadow-md text-gray-800">
      <div className={`p-5 ${player.isActive ? "bg-white" : "bg-gray-50"}`}>
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {player.firstName} {player.lastName}
            </h3>

            <div className="flex items-center mt-2">
              {player.position && (
                <span className="inline-block px-2.5 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full mr-2">
                  {player.position}
                </span>
              )}

              {player.jerseyNumber !== undefined && (
                <span className="inline-block px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                  #{player.jerseyNumber}
                </span>
              )}
            </div>
          </div>

          <div
            className={`w-3 h-3 rounded-full mt-1.5 ${
              player.isActive ? "bg-green-500" : "bg-gray-400"
            }`}
            title={player.isActive ? "Active" : "Inactive"}
          />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-xs text-gray-500 mb-1">Age</p>
            <p className="font-medium">{calculateAge(player.dateOfBirth)}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Nationality</p>
            <p className="font-medium">{player.nationality || "N/A"}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Height</p>
            <p className="font-medium">
              {player.height ? `${player.height} cm` : "N/A"}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Weight</p>
            <p className="font-medium">
              {player.weight ? `${player.weight} kg` : "N/A"}
            </p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Date of Birth</p>
            <p className="font-medium">{formatDate(player.dateOfBirth)}</p>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-1">Status</p>
            <p
              className={`font-medium ${
                player.isActive ? "text-green-600" : "text-gray-500"
              }`}
            >
              {player.isActive ? "Active" : "Inactive"}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 px-5 py-3 flex justify-end space-x-3 border-t border-gray-100">
        <button
          onClick={() => onEdit(player)}
          className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors duration-200"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(player.id)}
          className="px-4 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200"
        >
          Delete
        </button>
      </div>
    </div>
  );
}