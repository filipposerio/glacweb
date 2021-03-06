USE [sailstest]
GO
/****** Object:  StoredProcedure [dbo].[qryEsaApparecchiatura]    Script Date: 10/08/2018 12:42:19 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE [dbo].[qryEsaApparecchiatura]
	@barcode nvarchar(30),  @MSGOUT  NVARCHAR(150) OUTPUT, @NOMINATIVO NVARCHAR(150) OUTPUT
AS 
BEGIN
	DECLARE @MSG AS NVARCHAR(100)
	DECLARE @SQLQuery AS NVARCHAR(500)
	DECLARE @ParameterDefinition AS NVARCHAR(100)
	DECLARE @TableName AS NVARCHAR(100)
	DECLARE @NUMERO_RIC_RETVALUE AS NVARCHAR(15)
	DECLARE @NOMINATIVO_RETVALUE AS NVARCHAR(15)
	DECLARE @NROW as INT
	DECLARE @ANNO  as NVARCHAR(4)
	DECLARE @MESE as NVARCHAR(2)
	DECLARE @MESE_PRECEDENTE as NVARCHAR(2)
	DECLARE @GIORNO  as NVARCHAR(2)
	DECLARE @MESE_STRINGA AS NVARCHAR(20)
	DECLARE @MESE_PRECEDENTE_STRINGA AS NVARCHAR(20)

	/* set the parameter value */
	--SELECT GETDATE() 
	
	
	SET @MESE =  SUBSTRING(CONVERT(nvarchar(20), GETDATE(), 101),1,2)
	SET @MESE_PRECEDENTE =  SUBSTRING(CONVERT(nvarchar(20), GETDATE(), 101),1,2)-1
	SET @GIORNO =  SUBSTRING(CONVERT(nvarchar(20), GETDATE(), 101),4,2)
	SET @ANNO =  SUBSTRING(CONVERT(nvarchar(20), GETDATE(), 101),7,4)	
	PRINT @ANNO
 	PRINT @MESE
	PRINT @GIORNO

 	PRINT @MESE_PRECEDENTE
	Select @MESE_STRINGA =
		CASE @MESE
			WHEN '01' THEN 'GENNAIO'
			WHEN '02' THEN 'FEBBRAIO'
			WHEN '03' THEN 'MARZO'
			WHEN '04' THEN 'APRILE'
			WHEN '05' THEN 'MAGGIO'
			WHEN '06' THEN 'GIUGNO'
			WHEN '07' THEN 'LUGLIO'
			WHEN '08' THEN 'AGOSTO'
			WHEN '09' THEN 'SETTEMBRE'
			WHEN '10' THEN 'OTTOBRE'
			WHEN '11' THEN 'NOVEMBRE'
			WHEN '12' THEN 'DICEMBRE'
		END
	PRINT @MESE_STRINGA
	Select @MESE_PRECEDENTE_STRINGA =
		CASE @MESE
			WHEN '01' THEN 'DICEMBRE'
			WHEN '02' THEN 'GENNAIO'
			WHEN '03' THEN 'FEBBRAIO'
			WHEN '04' THEN 'MARZO'
			WHEN '05' THEN 'APRILE'
			WHEN '06' THEN 'MAGGIO'
			WHEN '07' THEN 'GIUGNO'
			WHEN '08' THEN 'LUGLIO'
			WHEN '09' THEN 'AGOSTO'
			WHEN '10' THEN 'SETTEMBRE'
			WHEN '11' THEN 'OTTOBRE'
			WHEN '12' THEN 'NOVEMBRE'
		END
	PRINT @MESE_PRECEDENTE_STRINGA

	PRINT 'CERCO RICETTA IN TABELLA GIONRNALIERA PER BARCODE ' + @barcode
	SET @TableName = 'ESA_' + @MESE_STRINGA +'_VV_'+ @GIORNO+@MESE+@ANNO
	/* Build Transact-SQL String by including the parameter */
	PRINT @TableName
	
	/*SET @SQLQuery = 'SELECT DISTINCT @retRicettaOUT=numero_ric, @delta1OUT=delta1 FROM  ' + @TableName + ' WHERE barcode like ''%' + @barcode+'%'''*/
	SET @SQLQuery = 'SELECT DISTINCT @retRicettaOUT=numero_ric, @delta1OUT=delta1 FROM  ' + @TableName + ' WHERE barcode like ''%' + @barcode+'%'''
	print @SQLQuery
	SET @ParameterDefinition = '@retRicettaOUT NVARCHAR(15) OUTPUT, @delta1OUT  NVARCHAR(15) OUTPUT';
	/*SET @ParameterDefinition = '@delta1OUT NVARCHAR(15) OUTPUT';*/
	/*EXECUTE sp_executesql @SQLQuery, @ParameterDefinition, @retRicettaOUT=@NUMERO_RIC_RETVALUE  OUTPUT, @delta1OUT=@NOMINATIVO_RETVALUE  OUTPUT;*/
	EXECUTE sp_executesql @SQLQuery, @ParameterDefinition, @retRicettaOUT=@NUMERO_RIC_RETVALUE  OUTPUT, @delta1OUT=@NOMINATIVO_RETVALUE OUTPUT
	SET @NROW = @@ROWCOUNT
	PRINT @NROW
	PRINT @NUMERO_RIC_RETVALUE
	if @NROW > 0 
		begin
			-- trovata ricetta in tabella giornaliera
			PRINT 'TROVATA RICETTA IN TABELLA GIORNALIERA...'
			SET @NOMINATIVO=@NOMINATIVO_RETVALUE
			SET @SQLQuery = 'SELECT * from ' + @TableName + ' WHERE NUMERO_RIC =' + @NUMERO_RIC_RETVALUE 
		

			EXECUTE sp_executesql @SQLQuery--, @ParameterDefinition, @EmpID
			SET @NROW = @@ROWCOUNT
			PRINT @NROW
			if @NROW > 0
				begin
					SET @MSGOUT='OK select TABELLA GIORNALIERA PER BARCODE ' + @barcode
				end
			else
				begin
					SET @MSGOUT='RICETTA IN TABELLA GIORNALIERA MA ZERO RIGHE DA SELEZIONARE  IN TABELLA GG PER BARCODE ' + @barcode 
				end
		end
	else
		begin 
			PRINT '....TENTO NELLA MENSILE'
			SET @TableName = 'ESA_' + @MESE_STRINGA + '_' +@ANNO -- tento nella tabella mensile
			PRINT @TableName
			SET @SQLQuery = 'SELECT DISTINCT @retRicettaOUT=numero_ric, @delta1OUT=delta1 FROM  ' + @TableName + ' WHERE barcode like ''%' + @barcode+'%'''
			print @SQLQuery
			SET @ParameterDefinition = '@retRicettaOUT NVARCHAR(15) OUTPUT, @delta1OUT  NVARCHAR(15) OUTPUT';
			
			EXECUTE sp_executesql @SQLQuery, @ParameterDefinition, @retRicettaOUT=@NUMERO_RIC_RETVALUE  OUTPUT, @delta1OUT=@NOMINATIVO_RETVALUE  OUTPUT;
			SET @NROW = @@ROWCOUNT
			PRINT @NROW
			PRINT @NUMERO_RIC_RETVALUE
			if @NROW > 0 
				begin
					PRINT 'TROVATA RICETTA IN TABELLA MENSILE...TENTO UPDATE'
					PRINT 'STAMPO RICETTA';  
					PRINT @NUMERO_RIC_RETVALUE
					-- trovata ricetta in tabella mensile. eseguo update
					SET @SQLQuery = 'SELECT * from ' + @TableName + ' WHERE NUMERO_RIC =' + @NUMERO_RIC_RETVALUE 
					EXECUTE sp_executesql @SQLQuery--, @ParameterDefinition, @EmpID
					if @@ROWCOUNT > 0 
						begin
							SET @MSGOUT='OK select TABELLA MENSILE PER BARCODE ' + @barcode 
						end
					else
						begin
							SET @MSGOUT='ERRORE select TABELLA MENSILE PER BARCODE ' + @barcode 
						end
				end
			else
			begin 
				PRINT '....TENTO NEL MESE PRECEDENTE'
				SET @TableName = 'ESA_' + @MESE_PRECEDENTE_STRINGA + '_' +@ANNO -- tento nella tabella mensile				SET @TableName = 'ESA_GIUGNO_2017'
				PRINT @TableName
				SET @SQLQuery = 'SELECT DISTINCT @retRicettaOUT=numero_ric, @delta1OUT=delta1 FROM  ' + @TableName + ' WHERE barcode like ''%' + @barcode+'%'''
				print @SQLQuery
				SET @ParameterDefinition = '@retRicettaOUT NVARCHAR(15) OUTPUT, @delta1OUT  NVARCHAR(15) OUTPUT';
				EXECUTE sp_executesql @SQLQuery, @ParameterDefinition, @retRicettaOUT=@NUMERO_RIC_RETVALUE  OUTPUT, @delta1OUT=@NOMINATIVO_RETVALUE  OUTPUT;
				SET @NROW = @@ROWCOUNT
				PRINT @NROW
				PRINT @NUMERO_RIC_RETVALUE
				if @NROW > 0 
					begin
						PRINT 'TROVATA RICETTA IN MESE PRECEDENTE...TENTO UPDATE'
						-- trovata ricetta in tabella mese precedente. eseguo updete
						SET @SQLQuery = 'SELECT * from ' + @TableName + ' WHERE NUMERO_RIC =' + @NUMERO_RIC_RETVALUE 
						EXECUTE sp_executesql @SQLQuery--, @ParameterDefinition, @EmpID
						if @@ROWCOUNT > 0 
							begin
								SET @MSGOUT='OK select TABELLA MESE PRECEDENTE PER BARCODE ' + @barcode
							end
						else
							begin
								SET @MSGOUT='ERRORE select IN TABELLA MESE PRECEDENTE PER BARCODE ' + @barcode 
							end
					end
						else
							begin
								SET @MSGOUT='NON TROVATA RICETTA PER BARCODE ' + @barcode + ' IN NESSUNA TABELLA'
							end
			end
		end

END