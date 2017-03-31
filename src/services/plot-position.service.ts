import { Request, Response, NextFunction } from "express";

const debug = require("debug");

import PlotPositionController from "./../controllers/plot-position.controller";
import PlotPositionInterface from "./../models/plot-position.interface";

// Middleware for getting and setting plot position data
export class PlotPositionService {

    private plotPositionController: PlotPositionController;

    constructor( _plotPositionController?: PlotPositionController ) {
        this.plotPositionController = ( _plotPositionController || new PlotPositionController() );
    }

    // get plot positions
    public get = ( request: Request, response: Response ) => {


        // find desired elements in request parameters
        let get_deleted: boolean = request.query.get_deleted;
        let id: number = request.query.id;
        let name: string = request.query.name;

        // query the controller function
        this.plotPositionController
        .get( id, name, get_deleted )
        .then( ( _plot_position: PlotPositionInterface[] ) => {
            if ( _plot_position.length < 1 ) response.status( 404 ).send();
            else {
                response.status( 200 ).send( { plot_position : _plot_position } );
            }
        } )
        .catch( ( error: Error ) => {
            console.log( error );
            response.status( 500 ).send("Server error");
        } );
    }

    public post = ( request: Request, response: Response ) => {
        let _r = request.body.r;
        let _t = request.body.t;
        let _z = request.body.z;

        return this.plotPositionController
        .post(
            _r,
            _t,
            _z
        )
        .then( ( _new: PlotPositionInterface ) => {
            console.log( JSON.stringify( _new ) );
            response.status( 201 ).send( _new );
        } )
        .catch( ( error: Error ) => {
            console.log( error );
            response.status( 500 ).send("Server error");
        } );

    }

    public delete = ( parameter: Request, response: Response ) => {
        let id = parameter.body.id;

        return this.plotPositionController
        .delete( id )
        .then( ( _deleted: PlotPositionInterface[] ) => {
            console.log( "deleted tool id: " + id );
            if ( _deleted.length > 0 ) response.status( 204 ).send( _deleted );
            response.status( 404 ).send();
        } )
        .catch( ( error: Error ) => {
            console.log( error );
            response.status( 500 ).send();
        } );
    }

    public put = ( request: Request, response: Response, next: NextFunction ) => {
        console.log(request.params);
        //response.send(request.params);
        let id: number = request.params.id;
        let _r = request.body.r;
        let _t = request.body.t;
        let _z = request.body.z;

        this.plotPositionController
        .put(
            id,
            _r,
            _t,
            _z
        )
        .then( ( plots: PlotPositionInterface ) => {
            response.status( 200 ).send( { plots : plots } );
            
        } )
        .catch( ( error: Error ) => {
            console.log( error );
            response.status( 500 ).send("Server error");
        } );
    }

}

export default PlotPositionService;