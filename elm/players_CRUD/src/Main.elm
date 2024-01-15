module Main exposing (..)

import Browser
import Html exposing (Html, div, h1, input, button, form, label, text, ol, li)
import Html.Attributes exposing (id, type_, placeholder, class)
import Html.Events exposing (onCheck, onClick, onInput, onSubmit)


initPlayer : Int -> Player
initPlayer id =
    Player id "" False


type alias Player =
    { id : Int
    , name : String
    , isActive : Bool
    }


type alias Model =
    { players : List Player
    , newPlayer : Player
    }


type Msg
    = SetName String
    | AddPlayer
    | ModifyPlayer Int Bool
    | DeletePlayer Int


init : Model
init =
    { players = []
    , newPlayer = initPlayer 0
    }


update : Msg -> Model -> Model
update msg model =
    case msg of
        SetName name ->
            { model | newPlayer = setPlayerName name model.newPlayer }

        AddPlayer ->
            { model | players = model.players ++ [model.newPlayer], newPlayer = initPlayer (List.length model.players + 1) }

        DeletePlayer id ->
            { model | players = List.filter (\player -> player.id /= id) model.players }

        ModifyPlayer id status ->
            { model | players = List.map (\player -> if player.id == id then { player | isActive = status } else player) model.players }

setPlayerName : String -> Player -> Player
setPlayerName name player =
    { player | name = name }


view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text "Elm Exercise: Players CRUD" ]
        , viewForm
        , viewPlayers model.players
        ]

viewForm : Html Msg
viewForm =
    form [ id "submit-player", onSubmit AddPlayer ]
        [ input [ id "input-player", type_ "text", placeholder "Enter player name", onInput SetName ] []
        , button [ id "btn-add", type_ "submit" ] [ text "Add Player" ]
        ]

viewPlayers : List Player -> Html Msg
viewPlayers players =
    ol [ id "players-list" ] (List.map viewPlayer players)

viewPlayer : Player -> Html Msg
viewPlayer player =
    li []
        [ div [ class "player-name" ] [ text player.name ]
        , label [ class "player-status" ]
            [ input [ type_ "checkbox", class "player-status", onCheck (\isChecked -> ModifyPlayer player.id isChecked) ] []
            , text "Active"
            ]
        , button [ class "btn-delete", onClick (DeletePlayer player.id) ] [ text "Delete" ]
        ]


main : Program () Model Msg
main =
    Browser.sandbox
        { init = init
        , view = view
        , update = update
        }
