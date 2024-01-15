-- Fetch players from end point on load
-- Update the id from the fetched players
-- Add player to the end of the list


module Main exposing (..)

import Browser
import Html exposing (Html, div, h1, input, button, form, label, text, ol, li)
import Html.Attributes exposing (id, type_, placeholder, class)
import Html.Events exposing (onCheck, onClick, onInput, onSubmit)
import Http
import Json.Decode as Decode exposing (Decoder, field, map3)


type alias Player =
    { id : Int
    , name : String
    , isActive : Bool
    }


type alias Model =
    { players : List Player
    , newPlayer : Player
    , reqStatus : String
    }


type Msg
    = SetName String
    | ModifyPlayer Int Bool
    | AddPlayer
    | DeletePlayer Int
    | FetchPlayers (Result Http.Error (List Player))


playerDecoder : Decoder Player
playerDecoder =
    map3 Player (field "id" Decode.int) (field "name" Decode.string) (field "isActive" Decode.bool)


playersDecoder : Decoder (List Player)
playersDecoder =
    Decode.list playerDecoder


fetchPlayers : String -> Cmd Msg
fetchPlayers url =
    Http.get
        { url = url
        , expect = Http.expectJson FetchPlayers playersDecoder
        }

listLast : List a -> Maybe a
listLast list =
    List.head <| List.reverse list


initPlayer : Int -> Player
initPlayer id =
    Player id "" False


init : () -> ( Model, Cmd Msg )
init _ =
    ( { 
        players = []
      , newPlayer = initPlayer 0
      , reqStatus = "Loading..."
    }
    , fetchPlayers "http://localhost:3001/api/players/"
    )


update : Msg -> Model -> (Model, Cmd Msg)
update msg model =
    case msg of
        SetName name ->
            ({ model | newPlayer = setNameIn name model.newPlayer }, Cmd.none)

        AddPlayer ->
            ({ model | players = model.players ++ [model.newPlayer], newPlayer = initPlayer (List.length model.players + 1) }, Cmd.none)

        DeletePlayer id ->
            ({ model | players = List.filter (\player -> player.id /= id) model.players }, Cmd.none)

        ModifyPlayer id status ->
            ({ model | players = List.map (\player -> if player.id == id then { player | isActive = status } else player) model.players }, Cmd.none)

        FetchPlayers data ->
            case data of
                Ok fetchedPlayers ->
                    ({ model | players = fetchedPlayers, reqStatus = "" }, Cmd.none)

                Err err ->
                     ({ model | reqStatus = "An error has occurred!!!" }, Cmd.none)

viewRequestStatus : String -> Html Msg
viewRequestStatus status =
    div [ id "request-status" ] [ text status ]

setNameIn : String -> Player -> Player
setNameIn name player =
    { player | name = name }


view : Model -> Html Msg
view model =
    div []
        [ h1 [] [ text "Elm Exercise: Players CRUD" ]
        , viewForm
        , viewPlayers model.players
        , viewRequestStatus model.reqStatus -- Display request status
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
    li [id <| "player-" ++ String.fromInt player.id]
        [ div [class "player-name"] [text player.name]
        , label [class "player-status"]
            [ input
                [ type_ "checkbox"
                , class "player-status"
                , onCheck (\isChecked -> ModifyPlayer player.id isChecked)
                , Html.Attributes.checked player.isActive -- Set the checked property based on isActive
                ]
                []
            , text "Active"
            ]
        , button [class "btn-delete", onClick (DeletePlayer player.id)] [text "Delete"]
        ]

main : Program () Model Msg
main =
    Browser.element
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        }
