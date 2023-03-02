/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./context/TwitterContext.js":
/*!***********************************!*\
  !*** ./context/TwitterContext.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TwitterContext\": () => (/* binding */ TwitterContext),\n/* harmony export */   \"TwitterProvider\": () => (/* binding */ TwitterProvider)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _lib_client__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/client */ \"./lib/client.js\");\n\n\n\n\nconst TwitterContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nconst TwitterProvider = ({ children  })=>{\n    const { 0: appStatus , 1: setAppStatus  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const { 0: currentAccount , 1: setCurrentAccount  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const { 0: currentUser , 1: setCurrentUser  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)({});\n    const { 0: tweets , 1: setTweets  } = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)([]);\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        checkIfWalletIsConnected();\n    }, []);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        if (!currentAccount && appStatus == \"connected\") return;\n        getCurrentUserDetails(currentAccount);\n        fetchTweets();\n    }, [\n        currentAccount,\n        appStatus\n    ]);\n    /**\n   * Checks if there is an active wallet connection\n   */ const checkIfWalletIsConnected = async ()=>{\n        if (!window.ethereum) return setAppStatus(\"noMetaMask\");\n        try {\n            const addressArray = await window.ethereum.request({\n                method: \"eth_accounts\"\n            });\n            if (addressArray.length > 0) {\n                setAppStatus(\"connected\");\n                setCurrentAccount(addressArray[0]);\n                createUserAccount(addressArray[0]);\n            } else {\n                router.push(\"/\");\n                setAppStatus(\"notConnected\");\n            }\n        } catch (err) {\n            router.push(\"/\");\n            setAppStatus(\"error\");\n        }\n    };\n    /**\n   * Initiates MetaMask wallet connection\n   */ const connectWallet = async ()=>{\n        if (!window.ethereum) return setAppStatus(\"noMetaMask\");\n        try {\n            setAppStatus(\"loading\");\n            const addressArray = await window.ethereum.request({\n                method: \"eth_requestAccounts\"\n            });\n            if (addressArray.length > 0) {\n                setCurrentAccount(addressArray[0]);\n                createUserAccount(addressArray[0]);\n            } else {\n                router.push(\"/\");\n                setAppStatus(\"notConnected\");\n            }\n        } catch (err) {\n            setAppStatus(\"error\");\n        }\n    };\n    /**\n   * Creates an account in Sanity DB if the user does not already have one\n   * @param {String} userAddress Wallet address of the currently logged in user\n   */ const createUserAccount = async (userAddress = currentAccount)=>{\n        if (!window.ethereum) return setAppStatus(\"noMetaMask\");\n        try {\n            const userDoc = {\n                _type: \"users\",\n                _id: userAddress,\n                name: \"Cedric\",\n                isProfileImageNft: false,\n                profileImage: \"https://about.twitter.com/content/dam/about-twitter/en/brand-toolkit/brand-download-img-1.jpg.twimg.1920.jpg\",\n                walletAddress: userAddress\n            };\n            await _lib_client__WEBPACK_IMPORTED_MODULE_3__.client.createIfNotExists(userDoc);\n            setAppStatus(\"connected\");\n        } catch (error) {\n            router.push(\"/\");\n            setAppStatus(\"error\");\n        }\n    };\n    /**\n   * Generates NFT profile picture URL or returns the image URL if it's not an NFT\n   * @param {String} imageUri If the user has minted a profile picture, an IPFS hash; if not then the URL of their profile picture\n   * @param {Boolean} isNft Indicates whether the user has minted a profile picture\n   * @returns A full URL to the profile picture\n   */ const getNftProfileImage = async (imageUri, isNft)=>{\n        if (isNft) {\n            return `https://gateway.pinata.cloud/ipfs/${imageUri}`;\n        } else if (!isNft) {\n            return imageUri;\n        }\n    };\n    /**\n   * Gets all the tweets stored in Sanity DB.\n   */ const fetchTweets = async ()=>{\n        const query = `\n      *[_type == \"tweets\"]{\n        \"author\": author->{name, walletAddress, profileImage, isProfileImageNft},\n        tweet,\n        timestamp\n      }|order(timestamp desc)\n    `;\n        // setTweets(await client.fetch(query))\n        const sanityResponse = await _lib_client__WEBPACK_IMPORTED_MODULE_3__.client.fetch(query);\n        setTweets([]);\n        /**\n     * Async await not available with for..of loops.\n     */ sanityResponse.forEach(async (item)=>{\n            const profileImageUrl = await getNftProfileImage(item.author.profileImage, item.author.isProfileImageNft);\n            if (item.author.isProfileImageNft) {\n                const newItem = {\n                    tweet: item.tweet,\n                    timestamp: item.timestamp,\n                    author: {\n                        name: item.author.name,\n                        walletAddress: item.author.walletAddress,\n                        profileImage: profileImageUrl,\n                        isProfileImageNft: item.author.isProfileImageNft\n                    }\n                };\n                setTweets((prevState)=>[\n                        ...prevState,\n                        newItem\n                    ]\n                );\n            } else {\n                setTweets((prevState)=>[\n                        ...prevState,\n                        item\n                    ]\n                );\n            }\n        });\n    };\n    /**\n   * Gets the current user details from Sanity DB.\n   * @param {String} userAccount Wallet address of the currently logged in user\n   * @returns null\n   */ const getCurrentUserDetails = async (userAccount = currentAccount)=>{\n        if (appStatus !== \"connected\") return;\n        const query = `\n      *[_type == \"users\" && _id == \"${userAccount}\"]{\n        \"tweets\": tweets[]->{timestamp, tweet}|order(timestamp desc),\n        name,\n        profileImage,\n        isProfileImageNft,\n        coverImage,\n        walletAddress\n      }\n    `;\n        const response = await _lib_client__WEBPACK_IMPORTED_MODULE_3__.client.fetch(query);\n        const profileImageUri = await getNftProfileImage(response[0].profileImage, response[0].isProfileImageNft);\n        setCurrentUser({\n            tweets: response[0].tweets,\n            name: response[0].name,\n            profileImage: profileImageUri,\n            walletAddress: response[0].walletAddress,\n            coverImage: response[0].coverImage,\n            isProfileImageNft: response[0].isProfileImageNft\n        });\n    };\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(TwitterContext.Provider, {\n        value: {\n            appStatus,\n            currentAccount,\n            connectWallet,\n            tweets,\n            fetchTweets,\n            setAppStatus,\n            getNftProfileImage,\n            currentUser,\n            getCurrentUserDetails\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"/Users/cedric.wang/Desktop/twitter-blockchain-youtube-main/client/context/TwitterContext.js\",\n        lineNumber: 194,\n        columnNumber: 5\n    }, undefined));\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RixTQUFTLEtBQUssQ0FBVyxZQUFFLE1BQU07UUFFckMsS0FBSyxDQUFDbUMsS0FBSyxJQUFJO29DQUNpQixFQUFFVyxXQUFXLENBQUM7Ozs7Ozs7O0lBUTlDO1FBQ0EsS0FBSyxDQUFDQyxRQUFRLEdBQUcsS0FBSyxDQUFDbkQscURBQVksQ0FBQ3VDLEtBQUs7UUFFekMsS0FBSyxDQUFDYSxlQUFlLEdBQUcsS0FBSyxDQUFDaEIsa0JBQWtCLENBQzlDZSxRQUFRLENBQUMsQ0FBQyxFQUFFbkIsWUFBWSxFQUN4Qm1CLFFBQVEsQ0FBQyxDQUFDLEVBQUVwQixpQkFBaUI7UUFHL0J0QixjQUFjLENBQUMsQ0FBQztZQUNkQyxNQUFNLEVBQUV5QyxRQUFRLENBQUMsQ0FBQyxFQUFFekMsTUFBTTtZQUMxQm9CLElBQUksRUFBRXFCLFFBQVEsQ0FBQyxDQUFDLEVBQUVyQixJQUFJO1lBQ3RCRSxZQUFZLEVBQUVvQixlQUFlO1lBQzdCbkIsYUFBYSxFQUFFa0IsUUFBUSxDQUFDLENBQUMsRUFBRWxCLGFBQWE7WUFDeENvQixVQUFVLEVBQUVGLFFBQVEsQ0FBQyxDQUFDLEVBQUVFLFVBQVU7WUFDbEN0QixpQkFBaUIsRUFBRW9CLFFBQVEsQ0FBQyxDQUFDLEVBQUVwQixpQkFBaUI7UUFDbEQsQ0FBQztJQUNILENBQUM7SUFFRCxNQUFNLDZFQUNIOUIsY0FBYyxDQUFDcUQsUUFBUTtRQUN0QkMsS0FBSyxFQUFFLENBQUM7WUFDTm5ELFNBQVM7WUFDVEUsY0FBYztZQUNkbUIsYUFBYTtZQUNiZixNQUFNO1lBQ05LLFdBQVc7WUFDWFYsWUFBWTtZQUNaK0Isa0JBQWtCO1lBQ2xCNUIsV0FBVztZQUNYTSxxQkFBcUI7UUFDdkIsQ0FBQztrQkFFQVgsUUFBUTs7Ozs7O0FBR2YsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3R3aXR0ZXItd2ViMy8uL2NvbnRleHQvVHdpdHRlckNvbnRleHQuanM/N2RhNSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVDb250ZXh0LCB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSBcInJlYWN0XCI7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tIFwibmV4dC9yb3V0ZXJcIjtcbmltcG9ydCB7IGNsaWVudCB9IGZyb20gXCIuLi9saWIvY2xpZW50XCI7XG5cbmV4cG9ydCBjb25zdCBUd2l0dGVyQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQoKTtcblxuZXhwb3J0IGNvbnN0IFR3aXR0ZXJQcm92aWRlciA9ICh7IGNoaWxkcmVuIH0pID0+IHtcbiAgY29uc3QgW2FwcFN0YXR1cywgc2V0QXBwU3RhdHVzXSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbY3VycmVudEFjY291bnQsIHNldEN1cnJlbnRBY2NvdW50XSA9IHVzZVN0YXRlKFwiXCIpO1xuICBjb25zdCBbY3VycmVudFVzZXIsIHNldEN1cnJlbnRVc2VyXSA9IHVzZVN0YXRlKHt9KTtcbiAgY29uc3QgW3R3ZWV0cywgc2V0VHdlZXRzXSA9IHVzZVN0YXRlKFtdKTtcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjaGVja0lmV2FsbGV0SXNDb25uZWN0ZWQoKTtcbiAgfSwgW10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFjdXJyZW50QWNjb3VudCAmJiBhcHBTdGF0dXMgPT0gXCJjb25uZWN0ZWRcIikgcmV0dXJuO1xuICAgIGdldEN1cnJlbnRVc2VyRGV0YWlscyhjdXJyZW50QWNjb3VudCk7XG4gICAgZmV0Y2hUd2VldHMoKTtcbiAgfSwgW2N1cnJlbnRBY2NvdW50LCBhcHBTdGF0dXNdKTtcblxuICAvKipcbiAgICogQ2hlY2tzIGlmIHRoZXJlIGlzIGFuIGFjdGl2ZSB3YWxsZXQgY29ubmVjdGlvblxuICAgKi9cbiAgY29uc3QgY2hlY2tJZldhbGxldElzQ29ubmVjdGVkID0gYXN5bmMgKCkgPT4ge1xuICAgIGlmICghd2luZG93LmV0aGVyZXVtKSByZXR1cm4gc2V0QXBwU3RhdHVzKFwibm9NZXRhTWFza1wiKTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgYWRkcmVzc0FycmF5ID0gYXdhaXQgd2luZG93LmV0aGVyZXVtLnJlcXVlc3Qoe1xuICAgICAgICBtZXRob2Q6IFwiZXRoX2FjY291bnRzXCIsXG4gICAgICB9KTtcbiAgICAgIGlmIChhZGRyZXNzQXJyYXkubGVuZ3RoID4gMCkge1xuICAgICAgICBzZXRBcHBTdGF0dXMoXCJjb25uZWN0ZWRcIik7XG4gICAgICAgIHNldEN1cnJlbnRBY2NvdW50KGFkZHJlc3NBcnJheVswXSk7XG5cbiAgICAgICAgY3JlYXRlVXNlckFjY291bnQoYWRkcmVzc0FycmF5WzBdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJvdXRlci5wdXNoKFwiL1wiKTtcbiAgICAgICAgc2V0QXBwU3RhdHVzKFwibm90Q29ubmVjdGVkXCIpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcm91dGVyLnB1c2goXCIvXCIpO1xuICAgICAgc2V0QXBwU3RhdHVzKFwiZXJyb3JcIik7XG4gICAgfVxuICB9O1xuXG4gIC8qKlxuICAgKiBJbml0aWF0ZXMgTWV0YU1hc2sgd2FsbGV0IGNvbm5lY3Rpb25cbiAgICovXG4gIGNvbnN0IGNvbm5lY3RXYWxsZXQgPSBhc3luYyAoKSA9PiB7XG4gICAgaWYgKCF3aW5kb3cuZXRoZXJldW0pIHJldHVybiBzZXRBcHBTdGF0dXMoXCJub01ldGFNYXNrXCIpO1xuICAgIHRyeSB7XG4gICAgICBzZXRBcHBTdGF0dXMoXCJsb2FkaW5nXCIpO1xuXG4gICAgICBjb25zdCBhZGRyZXNzQXJyYXkgPSBhd2FpdCB3aW5kb3cuZXRoZXJldW0ucmVxdWVzdCh7XG4gICAgICAgIG1ldGhvZDogXCJldGhfcmVxdWVzdEFjY291bnRzXCIsXG4gICAgICB9KTtcblxuICAgICAgaWYgKGFkZHJlc3NBcnJheS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHNldEN1cnJlbnRBY2NvdW50KGFkZHJlc3NBcnJheVswXSk7XG4gICAgICAgIGNyZWF0ZVVzZXJBY2NvdW50KGFkZHJlc3NBcnJheVswXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByb3V0ZXIucHVzaChcIi9cIik7XG4gICAgICAgIHNldEFwcFN0YXR1cyhcIm5vdENvbm5lY3RlZFwiKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHNldEFwcFN0YXR1cyhcImVycm9yXCIpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogQ3JlYXRlcyBhbiBhY2NvdW50IGluIFNhbml0eSBEQiBpZiB0aGUgdXNlciBkb2VzIG5vdCBhbHJlYWR5IGhhdmUgb25lXG4gICAqIEBwYXJhbSB7U3RyaW5nfSB1c2VyQWRkcmVzcyBXYWxsZXQgYWRkcmVzcyBvZiB0aGUgY3VycmVudGx5IGxvZ2dlZCBpbiB1c2VyXG4gICAqL1xuICBjb25zdCBjcmVhdGVVc2VyQWNjb3VudCA9IGFzeW5jICh1c2VyQWRkcmVzcyA9IGN1cnJlbnRBY2NvdW50KSA9PiB7XG4gICAgaWYgKCF3aW5kb3cuZXRoZXJldW0pIHJldHVybiBzZXRBcHBTdGF0dXMoXCJub01ldGFNYXNrXCIpO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB1c2VyRG9jID0ge1xuICAgICAgICBfdHlwZTogXCJ1c2Vyc1wiLFxuICAgICAgICBfaWQ6IHVzZXJBZGRyZXNzLFxuICAgICAgICBuYW1lOiBcIkNlZHJpY1wiLFxuICAgICAgICBpc1Byb2ZpbGVJbWFnZU5mdDogZmFsc2UsXG4gICAgICAgIHByb2ZpbGVJbWFnZTpcbiAgICAgICAgICBcImh0dHBzOi8vYWJvdXQudHdpdHRlci5jb20vY29udGVudC9kYW0vYWJvdXQtdHdpdHRlci9lbi9icmFuZC10b29sa2l0L2JyYW5kLWRvd25sb2FkLWltZy0xLmpwZy50d2ltZy4xOTIwLmpwZ1wiLFxuICAgICAgICB3YWxsZXRBZGRyZXNzOiB1c2VyQWRkcmVzcyxcbiAgICAgIH07XG5cbiAgICAgIGF3YWl0IGNsaWVudC5jcmVhdGVJZk5vdEV4aXN0cyh1c2VyRG9jKTtcblxuICAgICAgc2V0QXBwU3RhdHVzKFwiY29ubmVjdGVkXCIpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByb3V0ZXIucHVzaChcIi9cIik7XG4gICAgICBzZXRBcHBTdGF0dXMoXCJlcnJvclwiKTtcbiAgICB9XG4gIH07XG5cbiAgLyoqXG4gICAqIEdlbmVyYXRlcyBORlQgcHJvZmlsZSBwaWN0dXJlIFVSTCBvciByZXR1cm5zIHRoZSBpbWFnZSBVUkwgaWYgaXQncyBub3QgYW4gTkZUXG4gICAqIEBwYXJhbSB7U3RyaW5nfSBpbWFnZVVyaSBJZiB0aGUgdXNlciBoYXMgbWludGVkIGEgcHJvZmlsZSBwaWN0dXJlLCBhbiBJUEZTIGhhc2g7IGlmIG5vdCB0aGVuIHRoZSBVUkwgb2YgdGhlaXIgcHJvZmlsZSBwaWN0dXJlXG4gICAqIEBwYXJhbSB7Qm9vbGVhbn0gaXNOZnQgSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHVzZXIgaGFzIG1pbnRlZCBhIHByb2ZpbGUgcGljdHVyZVxuICAgKiBAcmV0dXJucyBBIGZ1bGwgVVJMIHRvIHRoZSBwcm9maWxlIHBpY3R1cmVcbiAgICovXG4gIGNvbnN0IGdldE5mdFByb2ZpbGVJbWFnZSA9IGFzeW5jIChpbWFnZVVyaSwgaXNOZnQpID0+IHtcbiAgICBpZiAoaXNOZnQpIHtcbiAgICAgIHJldHVybiBgaHR0cHM6Ly9nYXRld2F5LnBpbmF0YS5jbG91ZC9pcGZzLyR7aW1hZ2VVcml9YDtcbiAgICB9IGVsc2UgaWYgKCFpc05mdCkge1xuICAgICAgcmV0dXJuIGltYWdlVXJpO1xuICAgIH1cbiAgfTtcblxuICAvKipcbiAgICogR2V0cyBhbGwgdGhlIHR3ZWV0cyBzdG9yZWQgaW4gU2FuaXR5IERCLlxuICAgKi9cbiAgY29uc3QgZmV0Y2hUd2VldHMgPSBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgcXVlcnkgPSBgXG4gICAgICAqW190eXBlID09IFwidHdlZXRzXCJde1xuICAgICAgICBcImF1dGhvclwiOiBhdXRob3ItPntuYW1lLCB3YWxsZXRBZGRyZXNzLCBwcm9maWxlSW1hZ2UsIGlzUHJvZmlsZUltYWdlTmZ0fSxcbiAgICAgICAgdHdlZXQsXG4gICAgICAgIHRpbWVzdGFtcFxuICAgICAgfXxvcmRlcih0aW1lc3RhbXAgZGVzYylcbiAgICBgO1xuXG4gICAgLy8gc2V0VHdlZXRzKGF3YWl0IGNsaWVudC5mZXRjaChxdWVyeSkpXG5cbiAgICBjb25zdCBzYW5pdHlSZXNwb25zZSA9IGF3YWl0IGNsaWVudC5mZXRjaChxdWVyeSk7XG5cbiAgICBzZXRUd2VldHMoW10pO1xuXG4gICAgLyoqXG4gICAgICogQXN5bmMgYXdhaXQgbm90IGF2YWlsYWJsZSB3aXRoIGZvci4ub2YgbG9vcHMuXG4gICAgICovXG4gICAgc2FuaXR5UmVzcG9uc2UuZm9yRWFjaChhc3luYyAoaXRlbSkgPT4ge1xuICAgICAgY29uc3QgcHJvZmlsZUltYWdlVXJsID0gYXdhaXQgZ2V0TmZ0UHJvZmlsZUltYWdlKFxuICAgICAgICBpdGVtLmF1dGhvci5wcm9maWxlSW1hZ2UsXG4gICAgICAgIGl0ZW0uYXV0aG9yLmlzUHJvZmlsZUltYWdlTmZ0XG4gICAgICApO1xuXG4gICAgICBpZiAoaXRlbS5hdXRob3IuaXNQcm9maWxlSW1hZ2VOZnQpIHtcbiAgICAgICAgY29uc3QgbmV3SXRlbSA9IHtcbiAgICAgICAgICB0d2VldDogaXRlbS50d2VldCxcbiAgICAgICAgICB0aW1lc3RhbXA6IGl0ZW0udGltZXN0YW1wLFxuICAgICAgICAgIGF1dGhvcjoge1xuICAgICAgICAgICAgbmFtZTogaXRlbS5hdXRob3IubmFtZSxcbiAgICAgICAgICAgIHdhbGxldEFkZHJlc3M6IGl0ZW0uYXV0aG9yLndhbGxldEFkZHJlc3MsXG4gICAgICAgICAgICBwcm9maWxlSW1hZ2U6IHByb2ZpbGVJbWFnZVVybCxcbiAgICAgICAgICAgIGlzUHJvZmlsZUltYWdlTmZ0OiBpdGVtLmF1dGhvci5pc1Byb2ZpbGVJbWFnZU5mdCxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIHNldFR3ZWV0cygocHJldlN0YXRlKSA9PiBbLi4ucHJldlN0YXRlLCBuZXdJdGVtXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZXRUd2VldHMoKHByZXZTdGF0ZSkgPT4gWy4uLnByZXZTdGF0ZSwgaXRlbV0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9O1xuXG4gIC8qKlxuICAgKiBHZXRzIHRoZSBjdXJyZW50IHVzZXIgZGV0YWlscyBmcm9tIFNhbml0eSBEQi5cbiAgICogQHBhcmFtIHtTdHJpbmd9IHVzZXJBY2NvdW50IFdhbGxldCBhZGRyZXNzIG9mIHRoZSBjdXJyZW50bHkgbG9nZ2VkIGluIHVzZXJcbiAgICogQHJldHVybnMgbnVsbFxuICAgKi9cbiAgY29uc3QgZ2V0Q3VycmVudFVzZXJEZXRhaWxzID0gYXN5bmMgKHVzZXJBY2NvdW50ID0gY3VycmVudEFjY291bnQpID0+IHtcbiAgICBpZiAoYXBwU3RhdHVzICE9PSBcImNvbm5lY3RlZFwiKSByZXR1cm47XG5cbiAgICBjb25zdCBxdWVyeSA9IGBcbiAgICAgICpbX3R5cGUgPT0gXCJ1c2Vyc1wiICYmIF9pZCA9PSBcIiR7dXNlckFjY291bnR9XCJde1xuICAgICAgICBcInR3ZWV0c1wiOiB0d2VldHNbXS0+e3RpbWVzdGFtcCwgdHdlZXR9fG9yZGVyKHRpbWVzdGFtcCBkZXNjKSxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgcHJvZmlsZUltYWdlLFxuICAgICAgICBpc1Byb2ZpbGVJbWFnZU5mdCxcbiAgICAgICAgY292ZXJJbWFnZSxcbiAgICAgICAgd2FsbGV0QWRkcmVzc1xuICAgICAgfVxuICAgIGA7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBjbGllbnQuZmV0Y2gocXVlcnkpO1xuXG4gICAgY29uc3QgcHJvZmlsZUltYWdlVXJpID0gYXdhaXQgZ2V0TmZ0UHJvZmlsZUltYWdlKFxuICAgICAgcmVzcG9uc2VbMF0ucHJvZmlsZUltYWdlLFxuICAgICAgcmVzcG9uc2VbMF0uaXNQcm9maWxlSW1hZ2VOZnRcbiAgICApO1xuXG4gICAgc2V0Q3VycmVudFVzZXIoe1xuICAgICAgdHdlZXRzOiByZXNwb25zZVswXS50d2VldHMsXG4gICAgICBuYW1lOiByZXNwb25zZVswXS5uYW1lLFxuICAgICAgcHJvZmlsZUltYWdlOiBwcm9maWxlSW1hZ2VVcmksXG4gICAgICB3YWxsZXRBZGRyZXNzOiByZXNwb25zZVswXS53YWxsZXRBZGRyZXNzLFxuICAgICAgY292ZXJJbWFnZTogcmVzcG9uc2VbMF0uY292ZXJJbWFnZSxcbiAgICAgIGlzUHJvZmlsZUltYWdlTmZ0OiByZXNwb25zZVswXS5pc1Byb2ZpbGVJbWFnZU5mdCxcbiAgICB9KTtcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxUd2l0dGVyQ29udGV4dC5Qcm92aWRlclxuICAgICAgdmFsdWU9e3tcbiAgICAgICAgYXBwU3RhdHVzLFxuICAgICAgICBjdXJyZW50QWNjb3VudCxcbiAgICAgICAgY29ubmVjdFdhbGxldCxcbiAgICAgICAgdHdlZXRzLFxuICAgICAgICBmZXRjaFR3ZWV0cyxcbiAgICAgICAgc2V0QXBwU3RhdHVzLFxuICAgICAgICBnZXROZnRQcm9maWxlSW1hZ2UsXG4gICAgICAgIGN1cnJlbnRVc2VyLFxuICAgICAgICBnZXRDdXJyZW50VXNlckRldGFpbHMsXG4gICAgICB9fVxuICAgID5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L1R3aXR0ZXJDb250ZXh0LlByb3ZpZGVyPlxuICApO1xufTtcbiJdLCJuYW1lcyI6WyJjcmVhdGVDb250ZXh0IiwidXNlRWZmZWN0IiwidXNlU3RhdGUiLCJ1c2VSb3V0ZXIiLCJjbGllbnQiLCJUd2l0dGVyQ29udGV4dCIsIlR3aXR0ZXJQcm92aWRlciIsImNoaWxkcmVuIiwiYXBwU3RhdHVzIiwic2V0QXBwU3RhdHVzIiwiY3VycmVudEFjY291bnQiLCJzZXRDdXJyZW50QWNjb3VudCIsImN1cnJlbnRVc2VyIiwic2V0Q3VycmVudFVzZXIiLCJ0d2VldHMiLCJzZXRUd2VldHMiLCJyb3V0ZXIiLCJjaGVja0lmV2FsbGV0SXNDb25uZWN0ZWQiLCJnZXRDdXJyZW50VXNlckRldGFpbHMiLCJmZXRjaFR3ZWV0cyIsIndpbmRvdyIsImV0aGVyZXVtIiwiYWRkcmVzc0FycmF5IiwicmVxdWVzdCIsIm1ldGhvZCIsImxlbmd0aCIsImNyZWF0ZVVzZXJBY2NvdW50IiwicHVzaCIsImVyciIsImNvbm5lY3RXYWxsZXQiLCJ1c2VyQWRkcmVzcyIsInVzZXJEb2MiLCJfdHlwZSIsIl9pZCIsIm5hbWUiLCJpc1Byb2ZpbGVJbWFnZU5mdCIsInByb2ZpbGVJbWFnZSIsIndhbGxldEFkZHJlc3MiLCJjcmVhdGVJZk5vdEV4aXN0cyIsImVycm9yIiwiZ2V0TmZ0UHJvZmlsZUltYWdlIiwiaW1hZ2VVcmkiLCJpc05mdCIsInF1ZXJ5Iiwic2FuaXR5UmVzcG9uc2UiLCJmZXRjaCIsImZvckVhY2giLCJpdGVtIiwicHJvZmlsZUltYWdlVXJsIiwiYXV0aG9yIiwibmV3SXRlbSIsInR3ZWV0IiwidGltZXN0YW1wIiwicHJldlN0YXRlIiwidXNlckFjY291bnQiLCJyZXNwb25zZSIsInByb2ZpbGVJbWFnZVVyaSIsImNvdmVySW1hZ2UiLCJQcm92aWRlciIsInZhbHVlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./context/TwitterContext.js\n");

/***/ }),

/***/ "./lib/client.js":
/*!***********************!*\
  !*** ./lib/client.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"client\": () => (/* binding */ client)\n/* harmony export */ });\n/* harmony import */ var _sanity_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @sanity/client */ \"@sanity/client\");\n/* harmony import */ var _sanity_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_sanity_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst client = _sanity_client__WEBPACK_IMPORTED_MODULE_0___default()({\n    projectId: \"ir4vmhbk\",\n    dataset: \"production\",\n    apiVersion: \"v1\",\n    token: \"skV82pG09ZfcK7Mqo3Fpzi9R3yYmmYXzHeiMJqVhnl7ZHH7RFuWS5huFU1NKqWUKJhkYzFZicNquI4TBNpj90BsoGADtsGfpJEw7tB4nb0RwOWZ1gQjd17y0FVjG5VVkeUvW91hKBxuZ56yoUd2rLpxxpMzWeNfN4NdsTa0oLwRg7iewT8K0\",\n    useCdn: false\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9saWIvY2xpZW50LmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUF5QztBQUVsQyxLQUFLLENBQUNDLE1BQU0sR0FBR0QscURBQVksQ0FBQyxDQUFDO0lBQ2xDRSxTQUFTLEVBQUVDLFVBQXlDO0lBQ3BERyxPQUFPLEVBQUUsQ0FBWTtJQUNyQkMsVUFBVSxFQUFFLENBQUk7SUFDaEJDLEtBQUssRUFBRUwsc0xBQW9DO0lBQzNDTyxNQUFNLEVBQUUsS0FBSztBQUNmLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90d2l0dGVyLXdlYjMvLi9saWIvY2xpZW50LmpzP2U2OWYiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHNhbml0eUNsaWVudCBmcm9tIFwiQHNhbml0eS9jbGllbnRcIjtcblxuZXhwb3J0IGNvbnN0IGNsaWVudCA9IHNhbml0eUNsaWVudCh7XG4gIHByb2plY3RJZDogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU0FOSVRZX1BST0pFQ1RfSUQsXG4gIGRhdGFzZXQ6IFwicHJvZHVjdGlvblwiLFxuICBhcGlWZXJzaW9uOiBcInYxXCIsXG4gIHRva2VuOiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TQU5JVFlfVE9LRU4sXG4gIHVzZUNkbjogZmFsc2UsXG59KTtcbiJdLCJuYW1lcyI6WyJzYW5pdHlDbGllbnQiLCJjbGllbnQiLCJwcm9qZWN0SWQiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfU0FOSVRZX1BST0pFQ1RfSUQiLCJkYXRhc2V0IiwiYXBpVmVyc2lvbiIsInRva2VuIiwiTkVYVF9QVUJMSUNfU0FOSVRZX1RPS0VOIiwidXNlQ2RuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./lib/client.js\n");

/***/ }),

/***/ "./pages/_app.tsx":
/*!************************!*\
  !*** ./pages/_app.tsx ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _context_TwitterContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../context/TwitterContext */ \"./context/TwitterContext.js\");\n/* harmony import */ var _lib_hexStyles_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/hexStyles.css */ \"./lib/hexStyles.css\");\n/* harmony import */ var _lib_hexStyles_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lib_hexStyles_css__WEBPACK_IMPORTED_MODULE_3__);\n\n\n\n\nfunction MyApp({ Component , pageProps  }) {\n    return(/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_context_TwitterContext__WEBPACK_IMPORTED_MODULE_2__.TwitterProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"/Users/cedric.wang/Desktop/twitter-blockchain-youtube-main/client/pages/_app.tsx\",\n            lineNumber: 9,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/cedric.wang/Desktop/twitter-blockchain-youtube-main/client/pages/_app.tsx\",\n        lineNumber: 8,\n        columnNumber: 5\n    }, this));\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLnRzeC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBOEI7QUFFNkI7QUFDOUI7U0FFcEJDLEtBQUssQ0FBQyxDQUFDLENBQUNDLFNBQVMsR0FBRUMsU0FBUyxFQUFXLENBQUMsRUFBRSxDQUFDO0lBQ2xELE1BQU0sNkVBQ0hILG9FQUFlOzhGQUNiRSxTQUFTO2VBQUtDLFNBQVM7Ozs7Ozs7Ozs7O0FBRzlCLENBQUM7QUFFRCxpRUFBZUYsS0FBSyIsInNvdXJjZXMiOlsid2VicGFjazovL3R3aXR0ZXItd2ViMy8uL3BhZ2VzL19hcHAudHN4PzJmYmUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICcuLi9zdHlsZXMvZ2xvYmFscy5jc3MnXG5pbXBvcnQgdHlwZSB7IEFwcFByb3BzIH0gZnJvbSAnbmV4dC9hcHAnXG5pbXBvcnQgeyBUd2l0dGVyUHJvdmlkZXIgfSBmcm9tICcuLi9jb250ZXh0L1R3aXR0ZXJDb250ZXh0J1xuaW1wb3J0ICcuLi9saWIvaGV4U3R5bGVzLmNzcydcblxuZnVuY3Rpb24gTXlBcHAoeyBDb21wb25lbnQsIHBhZ2VQcm9wcyB9OiBBcHBQcm9wcykge1xuICByZXR1cm4gKFxuICAgIDxUd2l0dGVyUHJvdmlkZXI+XG4gICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XG4gICAgPC9Ud2l0dGVyUHJvdmlkZXI+XG4gIClcbn1cblxuZXhwb3J0IGRlZmF1bHQgTXlBcHBcbiJdLCJuYW1lcyI6WyJUd2l0dGVyUHJvdmlkZXIiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.tsx\n");

/***/ }),

/***/ "./lib/hexStyles.css":
/*!***************************!*\
  !*** ./lib/hexStyles.css ***!
  \***************************/
/***/ (() => {



/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "@sanity/client":
/*!*********************************!*\
  !*** external "@sanity/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@sanity/client");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.tsx"));
module.exports = __webpack_exports__;

})();