/** @format
 *
 * @description
 * Student instructions:
 *
 * Copy contents for this file from the players_fetch exercise of the react week. There are no changes to this file otherwise
 *
 *
 *
 */

export const ListPlayer = ({ player, onClick }) => {
    const handlePlayerClick = () => {
        onClick(player.id);
    };

    return (
        <li id={`player-${player.id}`} onClick={handlePlayerClick}>
            <a href="#" onClick={(e) => e.preventDefault()}>
                {player.name}
            </a>
        </li>
    );
};
