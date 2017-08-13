export function executeSqlAsync(transaction: any, sql: string, parameters: any[]) {
    return new Promise(function(resolve, reject) {
        transaction.executeSql(sql, parameters, function() {
            resolve();
        }, function(t: any, error: Error) {
            reject(error);
        });
    });
}
