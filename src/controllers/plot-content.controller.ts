const debug = require("debug");

import  * as mysql from "mysql";
import MySQLConnector from "./../connector/mysql.connector";

import PlotContentInterface from "./../models/plot-content.interface";

export class PlotContentController {

    private DB: mysql.IPool;

    constructor( DB?: mysql.IPool ) {
        // instantiate DB by first checking for injected DB and creating one if one wasn't injected
        this.DB = ( DB || new MySQLConnector().pool );
    }

    // Call plant database for all plants
    public get( id?: number, getDeleted: boolean = false ): Promise<PlotContentInterface[]> {

        // Build MySQL query
        let query: string = "SELECT * FROM `PLOT_CONTENTS`";
        let queryParams: string[] = [];

        if ( !getDeleted ) {
            queryParams.push( "`ended_at` IS NULL" );
        }

        if ( id !== undefined && String( id ) !== "" ) {
            queryParams.push( "`id` = " + mysql.escape( id ) );
        }

        if ( queryParams.length > 0 ) {
            query += " WHERE " + queryParams.join( " AND " );
        }

        // Return Promise
        return new Promise( ( resolve, reject ) => {

            console.log( query );
            // Run MySQL Query
            this.DB.query( query, ( error: Error, results: PlotContentInterface[] ) => {

                // If there is an error, reject the promise with the error.
                if ( error ) {
                    reject( error );
                }

                // Otherwise resolve the promise with the MySQL results
                else {
                    debug( JSON.stringify( results ) );
                    resolve( results );
                }
            } );
        } );
    }

    // adding new plants to the database
    public post (
         _planted_at: Date,
         _PLANT_TYPES_id: number,
         _PLOT_POSITIONS_id: number
         ): Promise<PlotContentInterface> {

        let doc: PlotContentInterface = {
            planted_at: _planted_at,
            PLANT_TYPES_id: _PLANT_TYPES_id,
            PLOT_POSITIONS_id: _PLOT_POSITIONS_id
        };

        // Build MySQL query
        let query: string = "INSERT INTO `PLOT_CONTENTS` SET ?";

        return new Promise( ( resolve, reject ) => {
            console.log( query );
            this.DB.query( query, doc, ( error: Error, results ) => {
                if ( error ) reject( error );
                else {
                    console.log( "Inserted ID: " + results.insertId );
                    this.get( results.insertId )
                    .then( ( result: PlotContentInterface[] ) => {
                        resolve( result[0] );
                    } );
                }
            } );
        } );
    }

    public delete (
        _id: number
    ): Promise<PlotContentInterface[]> {
        // Build MySQL query
        let query: string = "UPDATE `PLOT_CONTENTS` SET `ended_at` = NOW()  WHERE `id` = " + mysql.escape( _id );

        return new Promise( ( resolve, reject ) => {
            console.log( query );

            this.get( _id )
            .then( ( results: PlotContentInterface[] ) => {
                if ( results.length > 0 )
                this.DB.query( query, ( error, result ) => {
                    if ( error ) reject( error );
                    resolve( results );
                } );
                else resolve( results );
            } )
            .catch( ( error ) => {
                reject( error );
            } );
        } );
    }

    public put(
         _id: number,
         _planted_at: Date,
         _PLANT_TYPES_id: number,
         _PLOT_POSITIONS_id: number
        ): Promise<PlotContentInterface> {

        let doc: PlotContentInterface = {
            planted_at: _planted_at,
            PLANT_TYPES_id: _PLANT_TYPES_id,
            PLOT_POSITIONS_id: _PLOT_POSITIONS_id
        };

        console.log(JSON.stringify(doc))


        let query: string = "UPDATE `PLOT_CONTENTS` SET ? WHERE `id`= " + mysql.escape(_id);

        return new Promise( ( resolve, reject ) => {
            console.log( query );
            this.DB.query( query, doc, ( error: Error, results ) => {
                if ( error ) reject( error );
                else {
                    console.log( "Updated ID: " + _id );
                    this.get( _id )
                    .then( ( result: PlotContentInterface[] ) => {
                        console.log(result);
                        resolve( result[0] );
                    } );
                }
            } );
        } );
    }
}

export default PlotContentController;