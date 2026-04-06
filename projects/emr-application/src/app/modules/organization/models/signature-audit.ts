export interface SignatureAuditRecord {
    id?: number;
    doctorId?: number;
    tokenId?: number;
    eventType?: string;
    success?: boolean;
    errorCode?: string;
    ipAddress?: string;
    userAgent?: string;
    details?: string;
    performedBy?: string;
    performedAt?: number;
}

export interface SignatureAuditResponse {
    records: SignatureAuditRecord[];
    message?: string;
    status?: number;
}
