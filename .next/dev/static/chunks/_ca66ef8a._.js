(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/auth-manager.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Gerenciador de Autenticação
 * Responsável por armazenar e recuperar dados de autenticação (token, userId)
 */ __turbopack_context__.s([
    "AuthManager",
    ()=>AuthManager
]);
const AUTH_TOKEN_KEY = 'agendou_auth_token';
const USER_ID_KEY = 'agendou_user_id';
const TOKEN_TYPE_KEY = 'agendou_token_type';
class AuthManager {
    /**
   * Salva os dados de autenticação no localStorage
   */ static saveAuth(authData) {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        localStorage.setItem(AUTH_TOKEN_KEY, authData.token);
        localStorage.setItem(USER_ID_KEY, authData.usuarioId);
        localStorage.setItem(TOKEN_TYPE_KEY, authData.tipo);
    }
    /**
   * Recupera o token de autenticação
   */ static getToken() {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return localStorage.getItem(AUTH_TOKEN_KEY);
    }
    /**
   * Recupera o ID do usuário
   */ static getUserId() {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return localStorage.getItem(USER_ID_KEY);
    }
    /**
   * Recupera o tipo do token
   */ static getTokenType() {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return localStorage.getItem(TOKEN_TYPE_KEY);
    }
    /**
   * Recupera todos os dados de autenticação
   */ static getAuthData() {
        const token = this.getToken();
        const usuarioId = this.getUserId();
        const tipo = this.getTokenType();
        if (!token || !usuarioId || !tipo) {
            return null;
        }
        return {
            token,
            usuarioId,
            tipo
        };
    }
    /**
   * Verifica se o usuário está autenticado
   */ static isAuthenticated() {
        return this.getToken() !== null;
    }
    /**
   * Remove todos os dados de autenticação (logout)
   */ static clearAuth() {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(USER_ID_KEY);
        localStorage.removeItem(TOKEN_TYPE_KEY);
    }
    /**
   * Retorna o header de autorização formatado
   */ static getAuthorizationHeader() {
        const token = this.getToken();
        const tipo = this.getTokenType();
        if (!token || !tipo) return null;
        return `${tipo} ${token}`;
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/copy-link-button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CopyLinkButton",
    ()=>CopyLinkButton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/link-2.js [app-client] (ecmascript) <export default as Link2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/use-toast.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$manager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/auth-manager.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
function CopyLinkButton() {
    _s();
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const { toast } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const handleCopy = ()=>{
        const userId = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$manager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthManager"].getUserId();
        if (!userId) {
            toast({
                title: "Erro",
                description: "Não foi possível obter o ID do usuário. Faça login novamente.",
                variant: "destructive"
            });
            return;
        }
        const link = `${window.location.origin}/agendar/${userId}`;
        navigator.clipboard.writeText(link);
        setCopied(true);
        toast({
            title: "Link copiado!",
            description: "O link de agendamento foi copiado para a área de transferência."
        });
        setTimeout(()=>setCopied(false), 2000);
    };
    const handleVisit = ()=>{
        const userId = __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$auth$2d$manager$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AuthManager"].getUserId();
        if (!userId) {
            toast({
                title: "Erro",
                description: "Não foi possível obter o ID do usuário. Faça login novamente.",
                variant: "destructive"
            });
            return;
        }
        router.push(`/agendar/${userId}`);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex gap-2",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                onClick: handleCopy,
                variant: "outline",
                className: "gap-2",
                children: [
                    copied ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                        className: "w-4 h-4"
                    }, void 0, false, {
                        fileName: "[project]/components/copy-link-button.tsx",
                        lineNumber: 55,
                        columnNumber: 19
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Link2$3e$__["Link2"], {
                        className: "w-4 h-4"
                    }, void 0, false, {
                        fileName: "[project]/components/copy-link-button.tsx",
                        lineNumber: 55,
                        columnNumber: 51
                    }, this),
                    copied ? "Copiado!" : "Copiar link"
                ]
            }, void 0, true, {
                fileName: "[project]/components/copy-link-button.tsx",
                lineNumber: 54,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                onClick: handleVisit,
                variant: "default",
                className: "gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ExternalLink$3e$__["ExternalLink"], {
                        className: "w-4 h-4"
                    }, void 0, false, {
                        fileName: "[project]/components/copy-link-button.tsx",
                        lineNumber: 59,
                        columnNumber: 9
                    }, this),
                    "Visualizar"
                ]
            }, void 0, true, {
                fileName: "[project]/components/copy-link-button.tsx",
                lineNumber: 58,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/copy-link-button.tsx",
        lineNumber: 53,
        columnNumber: 5
    }, this);
}
_s(CopyLinkButton, "7CWlg6js3hSqvYlo7KVx/NNQEQ8=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$use$2d$toast$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useToast"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = CopyLinkButton;
var _c;
__turbopack_context__.k.register(_c, "CopyLinkButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/lucide-react/dist/esm/icons/link-2.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Link2
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Link2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Link2", [
    [
        "path",
        {
            d: "M9 17H7A5 5 0 0 1 7 7h2",
            key: "8i5ue5"
        }
    ],
    [
        "path",
        {
            d: "M15 7h2a5 5 0 1 1 0 10h-2",
            key: "1b9ql8"
        }
    ],
    [
        "line",
        {
            x1: "8",
            x2: "16",
            y1: "12",
            y2: "12",
            key: "1jonct"
        }
    ]
]);
;
 //# sourceMappingURL=link-2.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/link-2.js [app-client] (ecmascript) <export default as Link2>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Link2",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$link$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/link-2.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>Check
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const Check = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("Check", [
    [
        "path",
        {
            d: "M20 6 9 17l-5-5",
            key: "1gmf2c"
        }
    ]
]);
;
 //# sourceMappingURL=check.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Check",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript)");
}),
"[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * @license lucide-react v0.454.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */ __turbopack_context__.s([
    "default",
    ()=>ExternalLink
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/createLucideIcon.js [app-client] (ecmascript)");
;
const ExternalLink = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$createLucideIcon$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])("ExternalLink", [
    [
        "path",
        {
            d: "M15 3h6v6",
            key: "1q9fwt"
        }
    ],
    [
        "path",
        {
            d: "M10 14 21 3",
            key: "gplh6r"
        }
    ],
    [
        "path",
        {
            d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6",
            key: "a6xqqp"
        }
    ]
]);
;
 //# sourceMappingURL=external-link.js.map
}),
"[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript) <export default as ExternalLink>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ExternalLink",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$external$2d$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/external-link.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=_ca66ef8a._.js.map